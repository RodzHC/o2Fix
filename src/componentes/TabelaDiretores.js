import React, { Component } from "react";
import PubSub from "pubsub-js";

export default class TabelaDiretores extends Component {
  constructor() {
    super();
    this.state = { lista: [], showSpinner: true };
  }

  componentWillMount() {
    this.setState({ showSpinner: true });
    fetch("/api/diretores")
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
    PubSub.subscribe("atualiza-lista-diretores", (topicName, lista) => {
      console.log(lista);
      this.setState({ lista: lista });
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
      <div>
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
        <img
          src={require("../public/spinner.gif")}
          id="spinner"
          style={{ display: this.state.showSpinner ? "block" : "none" }}
        />
      </div>
    );
  }
}
