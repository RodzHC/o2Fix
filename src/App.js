import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import FormLogin from "./componentes/FormLogin";
import FormCadastro from "./componentes/FormCadastro";
import Diretores from "./routes/Diretores";
import IndexAdmin from "./componentes/IndexAdmin";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <div className="log-form">
            <Route exact path="/" component={FormLogin} />
            <Route path="/adm" component={IndexAdmin} />
            <Route path="/cadastro" component={FormCadastro} />
          </div>
        </Switch>
      </main>
    );
  }
}

export default App;
