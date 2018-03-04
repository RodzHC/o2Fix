import React, { Component } from "react";
import FormLogin from "./componentes/FormLogin";
import Rotas from "./Rotas";

class App extends Component {
  render() {
    return (
      <div id="layout">
        <FormLogin />
        <Rotas />
      </div>
    );
  }
}

export default App;
