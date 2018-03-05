import React, { Component } from "react";
import PubSub from "pubsub-js";
import $ from "jquery";
import TratadorErros from "../infra/TratadorErros";
import InputCustomizado from "./InputCustomizado";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

export default class FormCadastro extends Component {
  constructor() {
    super();
    this.state = { nome: "", email: "", senha: "", senhaCheck: "" };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.setSenhaCheck = this.setSenhaCheck.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();

    $.ajax({
      url: "http://localhost:3001/api/cadastro",
      contentType: "application/json",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha
      }),
      success: function(novaListagem) {
        console.log("Entrei!");
        PubSub.publish("atualiza-lista-autores", novaListagem);
        this.setState({ nome: "", email: "", senha: "" });
      }.bind(this),
      error: function(resposta) {
        if (resposta.status === 400) {
          console.log(resposta.responseJSON);
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function() {
        PubSub.publish("limpa-erros", {});
      }
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
    return (
      <div>
        <h2>Cadastro</h2>
        <form onSubmit={this.enviaForm} method="post">
          <InputCustomizado
            id="nome"
            type="text"
            name="nome"
            value={this.state.nome}
            onChange={this.setNome}
            label="Nome"
          />
          <InputCustomizado
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.setEmail}
            label="Email"
          />
          <InputCustomizado
            id="senha"
            type="password"
            name="senha"
            value={this.state.senha}
            onChange={this.setSenha}
            label="Senha"
          />
          <InputCustomizado
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
    );
  }
}
