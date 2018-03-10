import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import FormLogin from "./componentes/FormLogin";
import FormCadastro from "./componentes/FormCadastro";
import Home from "./routes/Home";

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route path="/cadastro" component={FormCadastro} />
          <Route path="/home" component={Home} />
        </Switch>
      </main>
    );
  }
}
