import React, { Component } from "react";
import "../public/css/login.css";
import { Link, Redirect } from "react-router-dom";

import Auth from "../utilitarios/autenticador.js";

export default class FormLogin extends Component {
  constructor() {
    super();
    this.state = {
      msg: "",
      redirectToReferrer: false,
      spinner: true
    };
  }

  componentWillMount() {
    this.setState({ spinner: false });

    var Autenticador = new Promise(function(resolve, reject) {
      Auth.authenticate(resolve, reject);
    });

    Autenticador.then(() => {
      this.setState({ spinner: true });
      this.setState({ redirectToReferrer: true });
    }).catch(() => {
      this.setState({ spinner: true });
    });
  }

  envia(event) {
    event.preventDefault();
    this.setState({ spinner: false });
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
    console.log(this.props.apiBaseUrl);
    fetch(`${this.props.apiBaseUrl}api/autentica`, requestInfo)
      .then(res => {
        return res.json();
      })
      .then(mid => {
        if (mid.success === false) {
          const temp = mid.message;
          throw new Error(temp);
        } else if (mid.success === true) {
          this.setState({
            msg: mid.message,
            nome: "",
            email: ""
          });
          localStorage.setItem("auth-token", mid.token);

          Auth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ msg: error.message });
      });
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <img
          src={require("../public/spinner.gif")}
          id="spinnerLogin"
          style={{ display: this.state.spinner ? "none" : "block" }}
        />
        <div
          className="log-form"
          style={{ display: this.state.spinner ? "block" : "none" }}
        >
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
        </div>
      </div>
    );
  }
}
