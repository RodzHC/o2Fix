import $ from "jquery";
import InputCustomizado from "../componentes/InputCustomizado"
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TratadorErros from '../TratadorErros'

class FormularioLivro extends Component {
  constructor(props) {
    super(props);
    this.state = {diretorNome: '', diretorDataNascimento: '', diretorNacionalidade: ''};
    this.setDiretorNome = this.setDiretorNome.bind(this);
    this.setDiretorDataNascimento = this.setDiretorDataNascimento.bind(this);
    this.setDiretorNacionalidade= this.setDiretorNacionalidade.bind(this);
    this.handleLivroSubmit = this.handleLivroSubmit.bind(this);
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


  handleLivroSubmit(e) {
    e.preventDefault();
    var titulo = this.state.titulo.trim();
    var preco = this.state.preco.trim();
    var autorId = this.state.autorId;

    $.ajax({
      url: 'http://localhost:3001/api/livros',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({titulo:titulo,preco:preco,autorId:autorId}),
      success: function(novaListagem) {
          PubSub.publish( 'atualiza-lista-livros',novaListagem);
          this.setState({titulo:'',preco:'',autorId:''});
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

    this.setState({titulo: '', preco: '', autorId: ''});
  }

  render() {
    var autores = this.props.autores.map(function(autor){
      return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
    });
    return (
      <div className="autorForm">
        <form className="pure-form pure-form-aligned" onSubmit={this.handleLivroSubmit}>
          <InputCustomizado id="diretorNome" name="diretorNome" label="Nome do diretor: " type="text" value={this.state.diretorNome} placeholder="Nome do diretor" onChange={this.setDiretorNome} />
          <InputCustomizado id="diretorDataNascimento" name="diretorDataNascimento" label="Data de nascimento: " type="date" value={this.state.diretorDataNascimento}  onChange={this.setDiretorDataNascimento} />
          <div className="pure-controls">
            <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
              <option value="">Selecione</option>
              {autores}
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

class TabelaLivros extends Component {

  render() {
    var livros = this.props.lista.map(function(livro){
      return(
          <tr key={livro.titulo}>
            <td>{livro.titulo}</td>
            <td>{livro.autor.nome}</td>
            <td>{livro.preco}</td>
          </tr>
        );
      });
    return(
      <table className="pure-table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Preco</th>
          </tr>
        </thead>
        <tbody>
          {livros}
        </tbody>
      </table>
    );
  }
}

export default class LivroAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {lista : [],autores:[]};
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:3001/api/livros",
      dataType: 'json',
      success: function(data) {
        this.setState({lista: data});
      }.bind(this)
    });

    $.ajax({
      url: "http://localhost:3001/api/autores",
      dataType: 'json',
      success: function(data) {
        this.setState({autores: data});
      }.bind(this)
    });

    PubSub.subscribe('atualiza-lista-livros', function(topicName,lista){
      this.setState({lista:lista});
    }.bind(this));
  }


  render() {
    return(
      <div>
        <div className="header">
          <h1>Cadastro de Diretores</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivro autores={this.state.autores}/>
          <TabelaLivros lista={this.state.lista}/>
        </div>
      </div>
    );
  }
}
