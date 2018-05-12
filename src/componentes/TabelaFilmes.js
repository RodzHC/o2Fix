import React, { Component } from "react";
import PubSub from "pubsub-js";

import { Route, Link } from "react-router-dom";

export default class TabelaFilmes extends Component {
  constructor() {
    super();
    this.state = { lista: [], showSpinner: true };
  }

  componentWillMount() {
    this.setState({ showSpinner: true });

    fetch("/api/filmes")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ showSpinner: false });

        this.setState({ lista: res });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    PubSub.subscribe("atualiza-tabela-filmes", (topicName, lista) => {
      console.log(lista);
      this.setState({ lista: lista });
    });
  }

  render() {
    var myObject = this.state.lista;

    function Varredor(obj) {
      var ar = [];

      for (var key in obj) {
        var sinopseTemp = obj[key].filmeSinopse;

        if (sinopseTemp.length > 15) {
          sinopseTemp = (
            <Link
              href="#"
              className="pure-menu-link"
              to={`/home/filmes/sinopse/${obj[key].filmeSinopse}`}
            >
              {`${obj[key].filmeSinopse.substring(0, 9)}...`}
            </Link>
          );
        }
        ar.push(
          <tbody key={obj[key]._id}>
            <tr key={obj[key]._id}>
              <td>{obj[key].filmeTitulo}</td>
              <td>{obj[key].filmeDataLancamento}</td>
              <td>{obj[key].filmeDiretor.diretorNome}</td>
              <td>{sinopseTemp}</td>
            </tr>
          </tbody>
        );
      }
      return ar;
    }

    var filmes = Varredor(myObject);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Data de Lançamenoto</th>
              <th>Diretor</th>
              <th>Sinopse</th>
            </tr>
          </thead>
          {filmes}
        </table>
        <img
          src={require("../public/spinner.gif")}
          id="spinner"
          style={{ display: this.state.showSpinner ? "block" : "none" }}
        />
      </div>
    );
  }
}
