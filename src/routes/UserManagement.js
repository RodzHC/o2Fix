import React, { Component } from "react";

import TabelaUsuarios from "../componentes/TabelaUsuarios";

export default class UserManagement extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  render() {
    return (
      <div>
        <div className="content">
          <div className="header">
            <h1>User Management</h1>
          </div>
          <TabelaUsuarios />
        </div>
      </div>
    );
  }
}
