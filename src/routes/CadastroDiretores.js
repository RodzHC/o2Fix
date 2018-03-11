import $ from "jquery";
import InputCustomizado from "../componentes/InputCustomizado";
import React, { Component } from "react";
import PubSub from "pubsub-js";

class FormularioDiretores extends Component {
  constructor() {
    super();
    this.state = {
      diretorNome: "",
      diretorDataNascimento: "",
      Nacionalidadeionalidade: ""
    };

    this.setDiretorNome = this.setDiretorNome.bind(this);
    this.setDiretorDataNascimento = this.setDiretorDataNascimento.bind(this);
    this.setDiretorNacionalidade = this.setDiretorNacionalidade.bind(this);
    this.handleDiretoresSubmit = this.handleDiretoresSubmit.bind(this);
  }

  setDiretorNome(e) {
    this.setState({ diretorNome: e.target.value });
  }

  updateDirectors = list => {
    console.log(list);
    PubSub.publish("atualiza-lista-diretores", list);
    console.log("Chamou Atualização da lista");
    this.setState({
      diretorNome: "",
      diretorDataNascimento: "",
      diretorNacionalidade: ""
    });
  };

  setDiretorDataNascimento(e) {
    this.setState({ diretorDataNascimento: e.target.value });
  }

  setDiretorNacionalidade(e) {
    this.setState({ diretorNacionalidade: e.target.value });
  }

  handleDiretoresSubmit(e) {
    e.preventDefault();
    var diretorNome = this.state.diretorNome.trim();
    var diretorDataNascimento = this.state.diretorDataNascimento;
    var diretorNacionalidade = this.state.diretorNacionalidade;
    var update = this.updateDirectors;

    $.ajax({
      url: "http://localhost:3001/api/diretores",
      contentType: "application/json",
      dataType: "json",
      type: "POST",
      data: JSON.stringify({
        diretorNome: diretorNome,
        diretorDataNascimento: diretorDataNascimento,
        diretorNacionalidade: diretorNacionalidade
      }),
      success: update,
      error: function(resposta) {
        if (resposta.status === 400) {
        }
      },
      beforeSend: function() {
        PubSub.publish("limpa-erros", {});
      }
    });

    this.setState({
      diretorNome: "",
      diretorDataNascimento: "",
      diretorNacionalidade: ""
    });
  }

  render() {
    var myObject = this.props.nacionalidade;

    function Varredor(obj) {
      var ar = [];

      for (var key in obj) {
        ar.push(
          <option key={obj[key]._id} value={obj[key].name}>
            {obj[key].name}
          </option>
        );
      }
      return ar;
    }

    var meuPiru = Varredor(myObject);

    return (
      <div className="autorForm">
        <form
          className="pure-form pure-form-aligned"
          onSubmit={this.handleDiretoresSubmit}
        >
          <InputCustomizado
            id="diretorNome"
            name="diretorNome"
            label="Nome do diretor: "
            type="text"
            value={this.state.diretorNome}
            placeholder="Nome do diretor"
            onChange={this.setDiretorNome}
          />
          <InputCustomizado
            placeholder=""
            id="diretorDataNascimento"
            name="diretorDataNascimento"
            label="Data de nascimento: "
            type="date"
            value={this.state.diretorDataNascimento}
            onChange={this.setDiretorDataNascimento}
          />

          <div className="pure-control-group">
            <label>Nacionalidade</label>
            <select
              value={this.state.diretorNacionalidade}
              name="diretorNacionalidade"
              onChange={this.setDiretorNacionalidade}
            >
              <option value="" disabled value>
                Selecione
              </option>
              {meuPiru}
            </select>
          </div>
          <div className="pure-control-group">
            <label />
            <button type="submit" className="pure-button pure-button-primary">
              Gravar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

class TabelaDiretores extends Component {
  render() {
    var myObject = this.props.lista;

    function Varredor(obj) {
      var ar = [];

      for (var key in obj) {
        ar.push(
          <tr key={obj[key]._id}>
            <td>{obj[key].diretorNome}</td>
            <td>{obj[key].diretorNacionalidade}</td>
            <td>{obj[key].diretorDataNascimento}</td>
          </tr>
        );
      }
      return ar;
    }
    console.log(myObject);
    var diretoresTabela = Varredor(myObject);

    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nacionalidade</th>
            <th>Data de Nascimento (dd/mm/aaaa)</th>
          </tr>
        </thead>
        <tbody>{diretoresTabela}</tbody>
      </table>
    );
  }
}

export default class DiretoresAdmin extends Component {
  constructor() {
    super();
    this.state = { diretores: [], nacionalidade: [] };
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:3001/api/diretores",
      dataType: "json",
      success: function(lista) {
        this.setState({ diretores: lista });
      }.bind(this)
    });
    $.ajax({
      url: "http://localhost:3001/api/cadastro/nacionalidade",
      dataType: "json",
      success: function(lista) {
        this.setState({ nacionalidade: lista });
      }.bind(this)
    });

    PubSub.subscribe(
      "atualiza-lista-diretores",
      function(topicName, lista) {
        console.log("recebeu pubsub e setou state diretores");
        console.log(lista);

        this.setState({ diretores: lista });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Diretores</h1>
        </div>
        <div className="content" id="content">
          <FormularioDiretores nacionalidade={this.state.nacionalidade} />
          <TabelaDiretores lista={this.state.diretores} />
        </div>
      </div>
    );
  }
}
