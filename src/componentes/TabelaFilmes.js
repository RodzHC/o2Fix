import React, { Component } from "react";
import PubSub from "pubsub-js";

export default class TabelaFilmes extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentWillMount() {
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
        ar.push(
          <tr key={obj[key]._id}>
            <td>{obj[key].filmeTitulo}</td>
            <td>{obj[key].filmeDataLancamento}</td>
            <td>{obj[key].filmeDiretor.diretorNome}</td>
            <td>{obj[key].filmeSinopse}</td>
          </tr>
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
        <tbody>{filmes}</tbody>
      </table>
    );
  }
}
