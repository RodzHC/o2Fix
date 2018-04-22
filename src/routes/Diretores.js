import React, { Component } from "react";
import TabelaDiretores from "../componentes/TabelaDiretores";

export default class Diretores extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="header text-center">
            <h1>Diretores</h1>
          </div>
          <TabelaDiretores />
        </div>
      </div>
    );
  }
}
