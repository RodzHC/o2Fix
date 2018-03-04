import React, { Component } from "react";
import TratadorErros from "../TratadorErros";
import InputCustomizado from "./InputCustomizado";

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
        login: this.login.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:3001/api/public/login", requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("não foi possível fazer o login");
        }
      })
      .then(token => {
        localStorage.setItem("auth-token", token);
      })
      .catch(error => {
        this.setState({ msg: error.message });
      });
  }

  render() {
    return (
      <div className="log-form">
        <h2 className="header">Login</h2>

        <form
          className="pure-form"
          onSubmit={this.envia.bind(this)}
          method="post"
        >
          <InputCustomizado
            className="log-input"
            id="email"
            type="email"
            name="email"
            ref={input => (this.email = input)}
            label="Email"
          />
          <InputCustomizado
            className="log-input"
            id="senha"
            type="password"
            name="senha"
            ref={input => (this.senha = input)}
            label="Senha"
          />
          <div className="pure-control-group">
            <label />
            <button type="submit" className="pure-button pure-button-primary">
              Login
            </button>
            <a class="forgot" href="#">
              Forgot Username?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
