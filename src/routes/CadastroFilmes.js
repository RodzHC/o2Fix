import React, { Component } from "react";
import TabelaFilmes from "../componentes/TabelaFilmes";
import PubSub from "pubsub-js";

const apiBaseUrl = "/";

class FormularioFilmes extends Component {
  constructor() {
    super();
    this.state = { msg: "" };
  }

  updateTabelaFilmes(filmes) {
    console.log(`updateTabelaFilmes recebendo : ${filmes}`);

    PubSub.publish("atualiza-tabelaFilmes", { filmes });
  }

  handleFilmesSubmit(event) {
    event.preventDefault();

    const schema = {
      method: "POST",
      body: JSON.stringify({
        filmeTitulo: this.filmeTitulo.value,
        filmeDataLancamento: this.filmeDataLancamento.value,
        filmeDiretor: this.filmeDiretor.value,
        filmeSinopse: this.filmeSinopse.value
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    fetch(`${apiBaseUrl}api/filmes`, schema)
      .then(res => {
        return res.json();
      })
      .then(mid => {
        console.log(mid);
        if (mid.success === false) {
          var temp = mid.message;
          throw new Error(temp);
        } else if (mid.success === true) {
          console.log("Cadastro efetuado com sucesso");

          this.updateTabelaFilmes(mid);
        }
      })
      .catch(error => {
        this.setState({ msg: error.message });
        console.log(error);
      });
  }

  render() {
    var myObject = this.props.diretores;

    const mapDiretores = myObject.map(function(obj, index) {
      return (
        <option key={obj._id} value={obj._id}>
          {obj.diretorNome}
        </option>
      );
    });

    return (
      <div>
        <span>{this.state.msg}</span>
        <form
          className="pure-form pure-form-aligned"
          onSubmit={this.handleFilmesSubmit.bind(this)}
        >
          <fieldset>
            <div className="pure-control-group">
              <label name="filme-titulo">Titulo :</label>
              <input
                id="filme-titulo"
                type="text"
                placeholder="Nome do Filme"
                ref={input => (this.filmeTitulo = input)}
              />
              <span className="pure-form-message-inline" />
            </div>

            <div className="pure-control-group">
              <label name="data-lancamento">Data de Lançamento :</label>
              <input
                id="data-lancamento"
                type="date"
                placeholder="Password"
                ref={input => (this.filmeDataLancamento = input)}
              />
              <span className="pure-form-message-inline" />
            </div>

            <div className="pure-control-group">
              <label name="diretores">Diretor :</label>
              <select
                name="filmeDiretores"
                ref={input => (this.filmeDiretor = input)}
              >
                <option value="" disabled selected>
                  Selecione
                </option>
                {mapDiretores}
              </select>
              <span className="pure-form-message-inline" />
            </div>

            <div className="pure-control-group">
              <label name="foo">Sinopse :</label>
              <textarea
                ref={input => (this.filmeSinopse = input)}
                rows="4"
                cols="50"
                name="comment"
                form="usrform"
                placeholder="Escreva a sinopse aqui ...."
              />
              <span className="pure-form-message-inline" />
            </div>

            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default class FilmesControl extends Component {
  constructor() {
    super();
    this.state = { diretores: [] };
  }
  componentWillMount() {
    fetch(`${apiBaseUrl}api/diretores`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ diretores: res });
      });
  }

  render() {
    return (
      <div className="header">
        <h1>Cadastro de Filmes</h1>
        <div className="content">
          <FormularioFilmes diretores={this.state.diretores} />
          <TabelaFilmes />
        </div>
      </div>
    );
  }
}
