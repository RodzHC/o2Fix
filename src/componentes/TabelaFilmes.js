import React, { Component } from "react";

export default class TabelaFilmes extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentWillMount() {
    fetch("/api/filmes")
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        console.log(res.hasOwnProperty("teste"));
        this.setState({ lista: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var myObject = this.state.lista;
    console.log(myObject);

    function Varredor(obj) {
      var ar = [];

      for (var key in obj) {
        ar.push(
          <tr key={obj[key]._id}>
            <td>{obj[key].filmeTitulo}</td>
            <td>{obj[key].filmeDataLancamento}</td>
            <td>{obj[key].filmeDiretor}</td>
            <td>{obj[key].filmeSinopse}</td>
          </tr>
        );
      }
      return ar;
    }

    var filmes = Varredor(myObject);

    return (
      <table className="pure-table">
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
