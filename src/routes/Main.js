import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomeInit from "./HomeInit";
import CadastroDiretores from "./CadastroDiretores";
import CadastroFilmes from "./CadastroFilmes";
import Diretores from "./Diretores";
import Filmes from "./Filmes";
import UserManagement from "./UserManagement";

export default class Main extends Component {
  render() {
    return (
      <main>
        <Route exact path="/home" component={HomeInit} />
        <Route path="/home/diretores" component={Diretores} />
        <Route path="/home/filmes" component={Filmes} />
        <Route path="/home/cadastrofilmes" component={CadastroFilmes} />
        <Route path="/home/cadastrodiretores" component={CadastroDiretores} />
        <Route path="/home/userm" component={UserManagement} />
      </main>
    );
  }
}
