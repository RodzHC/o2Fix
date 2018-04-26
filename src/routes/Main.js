import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HomeInit from "./HomeInit";
import CadastroDiretores from "./CadastroDiretores";
import CadastroFilmes from "./CadastroFilmes";
import Diretores from "./Diretores";
import Filmes from "./Filmes";
import UserManagement from "./UserManagement";

import SinopseView from "./Views/sinopseView";
import diretoresView from "./Views/diretoresView";

export default class Main extends Component {
  render() {
    const headerClass = "header text-center headerClass";
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/home"
            headerClass={headerClass}
            component={HomeInit}
          />
          <Route
            path="/home/diretores"
            render={routeProps => (
              <Diretores {...routeProps} headerClass={headerClass} />
            )}
          />
          <Route
            path="/home/filmes"
            render={routeProps => (
              <Filmes {...routeProps} headerClass={headerClass} />
            )}
          />
          <Route
            path="/home/cadastrofilmes"
            render={routeProps => (
              <CadastroFilmes {...routeProps} headerClass={headerClass} />
            )}
          />
          <Route
            path="/home/cadastrodiretores"
            render={routeProps => (
              <CadastroDiretores {...routeProps} headerClass={headerClass} />
            )}
          />
          <Route
            path="/home/userm"
            render={routeProps => (
              <UserManagement {...routeProps} headerClass={headerClass} />
            )}
          />
          <Route
            path="/diretores/:nome"
            headerClass={headerClass}
            component={diretoresView}
          />
        </Switch>
        <Route path="/home/filmes/sinopse/:sinopse" component={SinopseView} />
      </main>
    );
  }
}
