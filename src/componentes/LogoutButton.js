import React from "react";
import Auth from "../utilitarios/autenticador";

import { withRouter } from "react-router-dom";

const LogoutButton = withRouter(({ history }) => (
  <button
    className="btn btn-primary btn-logout-indx"
    onClick={() => {
      Auth.signout(() => history.push("/"));
    }}
  >
    Sign out
  </button>
));

export default LogoutButton;
