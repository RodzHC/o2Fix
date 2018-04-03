import React, { Component } from "react";

export default class TabelaDiretores extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentWillMount() {
    fetch("/api/diretores")
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
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
            <td>{obj[key].diretorNome}</td>
            <td>{obj[key].diretorNacionalidade}</td>
            <td>{obj[key].diretorDataNascimento}</td>
            <td>Teste</td>
          </tr>
        );
      }
      return ar;
    }
    var diretoresTabela = Varredor(myObject);

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nacionalidade</th>
            <th>Data de Nascimento (dd/mm/aaaa)</th>
            <th>Filmes</th>
          </tr>
        </thead>
        <tbody>{diretoresTabela}</tbody>
      </table>
    );
  }
}
