import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import FormLogin from "./componentes/FormLogin";
import FormCadastro from "./componentes/FormCadastro";
import Home from "./componentes/Home";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <div className="log-form">
            <Route exact path="/" component={FormLogin} />
            <Route path="/cadastro" component={FormCadastro} />
          </div>
        </Switch>
        <Route path="/home" component={Home} />
      </main>
    );
  }
}

export default App;
