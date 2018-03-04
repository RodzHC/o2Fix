import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Cadastro from "./routes/Cadastro";
import Diretores from "./routes/Diretores";
import FormLogin from "./componentes/FormLogin";
import App from "./App";

export default class Rotas extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={FormLogin} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/diretores" component={Diretores} />
          <Route path="/app" component={App} />
        </Switch>
      </main>
    );
  }
}
