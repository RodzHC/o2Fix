import React, { Component } from "react";
import TabelaDiretores from "../componentes/TabelaDiretores";

export default class Diretores extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    document.title = "O2Fix - Lista Diretores";
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <div className={`${this.props.headerClass}`}>
          <h1>Diretores</h1>
        </div>
        <div className="content">
          <TabelaDiretores />
        </div>
      </div>
    );
  }
}
