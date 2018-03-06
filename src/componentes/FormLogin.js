import React, { Component } from "react";
import TratadorErros from "../infra/TratadorErros";
import Cadastro from "../routes/Cadastro";
import InputCustomizado from "./InputCustomizado";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

export default class FormComponent extends Component {
  constructor() {
    super();
    this.state = { msg: "" };
  }

  envia(event) {
    event.preventDefault();

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        login: this.logemail.value,
        senha: this.logsenha.value
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:8080/api/authenticate", requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("não foi possível fazer o login");
        }
      })
      .then(token => {
        console.log(token);
        //localStorage.setItem("auth-token", token);
      })
      .catch(error => {
        this.setState({ msg: error.message });
      });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.envia.bind(this)} method="post">
          <InputCustomizado
            id="email"
            type="email"
            name="email"
            ref={input => (this.logemail = input)}
            label="Email"
          />
          <InputCustomizado
            id="senha"
            type="password"
            name="senha"
            ref={input => (this.logsenha = input)}
            label="Senha"
          />

          <label />
          <button type="submit" className="btn">
            Login
          </button>
          <Link className="forgot" href="#" to="/cadastro">
            Criar nova conta
          </Link>
        </form>
      </div>
    );
  }
}
