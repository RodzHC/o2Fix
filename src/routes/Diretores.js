import $ from "jquery";
import InputCustomizado from "../componentes/InputCustomizado"
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TratadorErros from '../TratadorErros'

class FormularioDiretores extends Component {

  constructor(props) {
    super(props);
    this.state = {diretorNome: '', diretorDataNascimento: '', diretorNacionalidade: ''};
    this.setDiretorNome = this.setDiretorNome.bind(this);
    this.setDiretorDataNascimento = this.setDiretorDataNascimento.bind(this);
    this.setDiretorNacionalidade= this.setDiretorNacionalidade.bind(this);
    this.handleDiretoresSubmit = this.handleDiretoresSubmit.bind(this);
  }

  setDiretorNome(e) {
    this.setState({diretorNome: e.target.value});
  }

  setDiretorDataNascimento(e) {
    this.setState({diretorDataNascimento: e.target.value});
  }

  setDiretorNacionalidade(e) {
    this.setState({diretorNacionalidade: e.target.value});
  }


  handleDiretoresSubmit(e) {
    e.preventDefault();
    var diretorNome = this.state.diretorNome.trim();
    var diretorDataNascimento = this.state.diretorDataNascimento.trim();
    var diretorNacionalidade = this.state.diretorNacionalidade;

    $.ajax({
      url: 'http://localhost:3001/api/diretores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({diretorNome:diretorNome,diretorDataNascimento:diretorDataNascimento,diretorNacionalidade:diretorNacionalidade}),
      success: function(novaListagem) {
          PubSub.publish( 'atualiza-lista-livros',novaListagem);
          this.setState({diretorNome:'',diretorDataNascimento:'',diretorNacionalidade:''});
      },
      error: function(resposta){
        if(resposta.status === 400){
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      }
    });

    this.setState({diretorNome: '', diretorDataNascimento: '', diretorNacionalidade: ''});
  }

  render() {
    var diretores = this.props.diretores.map(function(autor){
      return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
    });
    return (
      <div className="autorForm">
        <form className="pure-form pure-form-aligned" onSubmit={this.handleLivroSubmit}>
          <InputCustomizado id="diretorNome" name="diretorNome" label="Nome do diretor: " type="text" value={this.state.diretorNome} placeholder="Nome do diretor" onChange={this.setDiretorNome} />
          <InputCustomizado id="diretorDataNascimento" name="diretorDataNascimento" label="Data de nascimento: " type="date" value={this.state.diretorDataNascimento}  onChange={this.setDiretorDataNascimento} />
          <div className="pure-controls">
            <select value={this.state.diretorNacionalidade} name="diretorNacionalidade" onChange={this.setdiretorNacionalidade}>
              <option value="">Selecione</option>
              {diretores}
            </select>
          </div>
          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}

class TabelaDiretores extends Component {

  render() {
    var livros = this.props.lista.map(function(livro){
      return(
          <tr key={livro.diretorNome}>
            <td>{livro.diretorNome}</td>
            <td>{livro.diretorNacionalidade.nome}</td>
            <td>{livro.diretorDataNascimento}</td>
          </tr>
        );
      });
    return(
      <table className="pure-table">
        <thead>
          <tr>
            <th>diretorNome</th>
            <th>Autor</th>
            <th>diretorDataNascimento</th>
          </tr>
        </thead>
        <tbody>
          {livros}
        </tbody>
      </table>
    );
  }
}

export default class DiretoresAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {diretores:[]};
  }

  componentDidMount() {


    $.ajax({
      url: "http://localhost:3001/api/diretores",
      dataType: 'json',
      success: function(lista) {
        this.setState({diretores: lista});
      }.bind(this)
    });

    PubSub.subscribe('atualiza-lista-diretores', function(topicName,lista){
      this.setState({diretores:lista});
    }.bind(this));
  }


  render() {
    return(
      <div>
        <div className="header">
          <h1>Cadastro de Diretores</h1>
        </div>
        <div className="content" id="content">
          <FormularioDiretores diretores={this.state.diretores}/>
          <TabelaDiretores lista={this.state.diretores}/>
        </div>
      </div>
    );
  }
}
