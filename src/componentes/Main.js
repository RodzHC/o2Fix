import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomeInit from "../routes/HomeInit";
import CadastroDiretores from "../routes/CadastroDiretores";

export default class Main extends Component {
  render() {
    return (
      <main>
        <Route exact path="/home" component={HomeInit} />
        <Route path="/home/diretores" component={CadastroDiretores} />
      </main>
    );
  }
}
