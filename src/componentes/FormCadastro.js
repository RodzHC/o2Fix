import React, { Component } from "react";
import InputCustomizado from "./InputCustomizado";
import { Link, Redirect } from "react-router-dom";

const apiBaseUrl = "/";

export default class FormCadastro extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      senha: "",
      senhaCheck: "",
      msg: "",
      redirectToLogin: false
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.setSenhaCheck = this.setSenhaCheck.bind(this);
  }
  redirect() {
    setTimeout(() => {
      var n = 6;
      const firstMsg = this.state.msg;

      var interval = setInterval(() => {
        n--;
        this.setState({ msg: `${firstMsg} Redirecionando em : ${n}` });
        if (n == 0) {
          clearInterval(interval);
          this.setState({ redirectToLogin: true });
        }
      }, 1000);
    }, 2000);
  }
  componentDidMount() {
    document.title = "O2Fix - Cadastro";
  }
  enviaForm(evento) {
    evento.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
        senhaConf: this.state.senhaCheck
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    fetch(`${apiBaseUrl}api/cadastro`, requestInfo)
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
            email: "",
            senha: "",
            senhaCheck: ""
          });
          this.redirect();
          return mid;
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ msg: error.message });
      });
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }
  setSenhaCheck(evento) {
    this.setState({ senhaCheck: evento.target.value });
  }

  render() {
    const loginPath = { pathname: "/" };
    if (this.state.redirectToLogin) {
      return <Redirect to={loginPath} />;
    }
    return (
      <div className="log-form">
        <div>
          <h2>Cadastro</h2>
          <span>{this.state.msg}</span>
          <form onSubmit={this.enviaForm.bind(this)}>
            <InputCustomizado
              placeholder=""
              id="nome"
              type="text"
              name="nome"
              value={this.state.nome}
              onChange={this.setNome}
              label="Nome"
            />
            <InputCustomizado
              placeholder=""
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.setEmail}
              label="Email"
            />
            <InputCustomizado
              placeholder=""
              id="senha"
              type="password"
              name="senha"
              value={this.state.senha}
              onChange={this.setSenha}
              label="Senha"
            />
            <InputCustomizado
              placeholder=""
              id="senhaCheck"
              type="password"
              name="senhaCheck"
              value={this.state.senhaCheck}
              onChange={this.setSenhaCheck}
              label="Confime a Senha"
            />
            <div>
              <label />
              <button type="submit" className="btn">
                Criar Conta
              </button>
              <Link className="forgot" href="#" to="/">
                Voltar para tela de Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
