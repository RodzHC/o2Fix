import React, { Component } from "react";
import PubSub from "pubsub-js";

import { Route, Link } from "react-router-dom";

const SinopseView = props => {
  console.log(props);

  return <td>{props.match.params.sinopse}</td>;
};

export default class TabelaFilmes extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentDidMount() {
    PubSub.subscribe(
      "atualiza-tabelaFilmes",
      function(topicName, filmes) {
        this.setState({ lista: filmes.filmes.content });
      }.bind(this)
    );

    fetch("/api/filmes")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ lista: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var myObject = this.state.lista;

    function Varredor(obj) {
      var ar = [];

      for (var key in obj) {
        var sinopseTemp = obj[key].filmeSinopse;
        var sinBoxTemp;
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

          sinBoxTemp = (
            <tr>
              <Route
                path="/home/filmes/sinopse/:sinopse"
                component={SinopseView}
              />
            </tr>
          );
        }

        ar.push(
          <tbody>
            <tr key={obj[key]._id}>
              <td>{obj[key].filmeTitulo}</td>
              <td>{obj[key].filmeDataLancamento}</td>
              <td>{obj[key].filmeDiretor.diretorNome}</td>
              <td>{sinopseTemp}</td>
            </tr>
            {sinBoxTemp}
          </tbody>
        );
      }
      return ar;
    }

    var filmes = Varredor(myObject);

    return (
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
    );
  }
}
