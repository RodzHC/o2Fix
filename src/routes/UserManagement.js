import React, { Component } from "react";

import TabelaUsuarios from "../componentes/TabelaUsuarios";

export default class UserManagement extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentDidMount() {
    document.title = "O2Fix - User Management";
  }

  render() {
    return (
      <div>
        <div className={`${this.props.headerClass}`}>
          <h1>User Management</h1>
        </div>
        <div className="content">
          <TabelaUsuarios />
        </div>
      </div>
    );
  }
}
