import React, { Component } from "react";
import FormCadastro from "../componentes/FormCadastro";
import FormLogin from "../componentes/FormLogin";
export default class Cadastro extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Login/Cadastro</h1>
        </div>
        <div className="content" id="content" />
        <FormLogin />
        <FormCadastro />
      </div>
    );
  }
}
