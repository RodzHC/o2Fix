import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./public/css/login.css";

import FormCadastro from "./componentes/FormCadastro";
import FormLogin from "./componentes/FormLogin";
import PrivateRoute from "./componentes/PrivateRoute";

import Home from "./routes/Home";

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { content } from "./reducers/content";
import { botao } from "./reducers/botao";
import { autenticador } from "./reducers/autenticador";

var apiBaseUrl = "/";
if (process.env.NODE_ENV === "development") {
  apiBaseUrl = "/";
} else if (process.env.NODE_ENV === "production") {
  apiBaseUrl = "/";
}

const reducers = combineReducers({ content, botao, autenticador });

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

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
          <PrivateRoute
            path="/home"
            component={routeProps => <Home {...routeProps} />}
          />
        </Switch>
      </main>
    );
  }
}
