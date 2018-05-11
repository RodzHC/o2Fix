import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./public/css/login.css";

import FormCadastro from "./componentes/FormCadastro";
import FormLogin from "./componentes/FormLogin";
import PrivateRoute from "./componentes/PrivateRoute";

import Home from "./routes/Home";

import Auth from "./utilitarios/autenticador.js";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { content } from "./reducers/content";

const apiBaseUrl = "/";
if (process.env.NODE_ENV === "development") {
  const apiBaseUrl = "/";
} else if (process.env.NODE_ENV === "production") {
  const apiBaseUrl = "/";
}

const store = createStore(content, applyMiddleware(thunkMiddleware));

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <FormLogin {...routeProps} apiBaseUrl={apiBaseUrl} />
            )}
          />
          <Route path="/cadastro" component={FormCadastro} />
          <PrivateRoute Auth={Auth} path="/home" component={Home} />
        </Switch>
      </main>
    );
  }
}
