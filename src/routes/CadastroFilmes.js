import React, { Component } from "react";

class FormularioFilmes extends Component {
  render() {
    var myObject = this.props.diretores;

    const mapDiretores = myObject.map(function(obj, index) {
      return (
        <option key={obj._id} value={obj.diretorNome}>
          {obj.diretorNome}
        </option>
      );
    });

    return (
      <div>
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label name="nome-diretores">Titulo :</label>
              <input
                id="nome-diretores"
                type="text"
                placeholder="Nome do Filme"
              />
              <span className="pure-form-message-inline" />
            </div>

            <div className="pure-control-group">
              <label name="data-lancamento">Data de Lançamento :</label>
              <input id="data-lancamento" type="date" placeholder="Password" />
              <span className="pure-form-message-inline" />
            </div>

            <div className="pure-control-group">
              <label name="diretores">Diretor :</label>
              <select name="diretorNacionalidade">
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

class TabelaFilmes extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Data de nascimento</th>
            <th>Diretor</th>
            <th>Sinopse</th>
          </tr>
        </thead>
        <tbody />
      </table>
    );
  }
}

export default class FilmesControl extends Component {
  constructor() {
    super();
    this.state = { diretores: [] };
  }
  componentWillMount() {
    fetch("http://localhost:3001/api/diretores")
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
