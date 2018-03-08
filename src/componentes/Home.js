import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Menu from "./Menu";
import HomeInit from "../routes/HomeInit";
import CadastroDiretores from "../routes/CadastroDiretores";

export default class IndexAdmin extends Component {
  render() {
    return (
      <div>
        <Menu />
        <main>
          <Switch>
            <Route exact path="/home" component={HomeInit} />
            <Route path="/cadastrodiretores" component={CadastroDiretores} />
          </Switch>
        </main>
      </div>
    );
  }
}
