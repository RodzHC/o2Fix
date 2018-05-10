import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

export default class PrivateRoute extends React.Component {
  constructor() {
    super();
    this.state = { refresh: false };
  }

  render() {
    const { component: Component, ...rest } = this.props;

    const renderRoute = props => {
      if (this.props.Auth.isAuthenticated) {
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
