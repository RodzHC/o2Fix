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
    console.log(this);
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        email: this.email.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:3001/api/autentica", requestInfo)
      .then(res => {
        return res.json();
      })
      .then(mid => {
        if (mid.success === false) {
          var temp = mid.message;
          throw new Error(temp);
        } else if (mid.success === true) {
          this.setState({
            msg: mid.message,
            nome: "",
            email: ""
          });
          return mid;
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ msg: error.message });
      });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <span>{this.state.msg}</span>
        <form onSubmit={this.envia.bind(this)} method="post">
          <label>E-mail</label>

          <input
            id="email"
            type="email"
            name="email"
            ref={input => (this.email = input)}
          />
          <label>Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            ref={input => (this.senha = input)}
          />

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
