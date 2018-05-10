import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import "./public/css/login.css";

import FormCadastro from "./componentes/FormCadastro";
import FormLogin from "./componentes/FormLogin";
import PrivateRoute from "./componentes/PrivateRoute";

import Home from "./routes/Home";

import Auth from "./utilitarios/autenticador.js";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { content } from "./reducers/content";

const store = createStore(content, applyMiddleware(thunkMiddleware));

// const apiBaseUrl =
//   process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "/";
const apiBaseUrl = "/";

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
