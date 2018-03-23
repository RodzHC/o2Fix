import React, { Component } from "react";
import Auth from "../utilitarios/autenticador";
import { browserHistory } from "react-router";

import { withRouter } from "react-router-dom";

const LogoutButton = withRouter(({ history }) => (
  <button
    className="btn btn-primary btn-logout-indx"
    onClick={() => {
      console.log(history);
      Auth.signout(() => history.push("/"));
    }}
  >
    Sign out
  </button>
));

export default LogoutButton;
