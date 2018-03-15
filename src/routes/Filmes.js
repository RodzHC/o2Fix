import React, { Component } from "react";
import TabelaFilmes from "../componentes/TabelaFilmes";

export default class Diretores extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Filmes</h1>
        </div>
        <TabelaFilmes />
      </div>
    );
  }
}
