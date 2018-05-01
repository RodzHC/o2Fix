import React, { Component } from "react";
import TabelaFilmes from "../componentes/TabelaFilmes";

export default class Diretores extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }
  componentDidMount() {
    document.title = "O2Fix - Lista Filmes";
  }

  render() {
    return (
      <div>
        <div className={`${this.props.headerClass}`}>
          <h1>Filmes</h1>
        </div>
        <hr />
        <div className="content">
          <TabelaFilmes />
        </div>
      </div>
    );
  }
}
