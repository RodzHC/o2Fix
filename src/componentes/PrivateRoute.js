import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Auth from "../utilitarios/autenticador";

export default class PrivateRoute extends Component {
  constructor() {
    super();
    this.state = { refresh: false };
  }

  render() {
    console.log(Auth);
    const { component: Component, ...rest } = this.props;

    const renderRoute = props => {
      if (Auth.isAuthenticated) {
        return <Component {...props} />;
      }

      const to = {
        pathname: "/",
        state: { from: props.location }
      };

      return <Redirect to={to} />;
    };
    return <Route {...rest} render={renderRoute} />;
  }
}
