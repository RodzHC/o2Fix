import React, { Component } from "react";
import TabelaFilmes from "../componentes/TabelaFilmes";
import PubSub from "pubsub-js";

const apiBaseUrl = "/";

class FormularioFilmes extends Component {
  constructor() {
    super();
    this.state = { msg: "", valueDate: "", formattedValue: "" };
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
        <form onSubmit={this.handleFilmesSubmit.bind(this)}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="filme-titulo" name="filme-titulo">
                Titulo :
              </label>
              <input
                className="form-control"
                id="filme-titulo"
                type="text"
                aria-describedby="emailHelp"
                placeholder="Nome do Filme"
                ref={input => (this.filmeTitulo = input)}
              />
              <span className="form-text text-muted" />
            </div>

            <div className="form-group">
              <label htmlFor="input-date" name="data-lancamento">
                Data de Lançamento :
              </label>
              <input
                className="form-control"
                id="input-date"
                type="date"
                ref={input => (this.filmeDataLancamento = input)}
              />
              <span className="form-text text-muted" />
            </div>

            <div className="form-group">
              <label htmlFor="input-select" name="diretores">
                Diretor :
              </label>
              <select
                id="input-select"
                className="form-control"
                ref={input => (this.filmeDiretor = input)}
              >
                <option value="" disabled selected>
                  Selecione
                </option>
                {mapDiretores}
              </select>
              <span className="form-text text-muted" />
            </div>

            <div className="form-group">
              <label htmlFor="input-textarea">Sinopse :</label>
              <textarea
                id="input-textarea"
                className="form-control"
                ref={input => (this.filmeSinopse = input)}
                rows="4"
                cols="50"
                form="usrform"
                placeholder="Escreva a sinopse aqui ...."
              />
              <span className="form-text text-muted" />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
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
