import React, { Component } from "react";

import Rotas from "./Rotas";
import Menu from "./Menu";
class App extends Component {
  render() {
    return (
      <div id="layout">
        <Rotas />
      </div>
    );
  }
}

export default App;
