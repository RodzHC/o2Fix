import React, { Component } from "react";

import Menu from "../componentes/Menu";
import Main from "./Main";

export default class IndexAdmin extends Component {
  constructor() {
    super();
    this.state = { button: "" };
    this.changeButton = this.changeButton.bind(this);
  }

  changeButton() {
    if (this.state.button == "") this.setState({ button: "active" });
    else {
      this.setState({ button: "" });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Menu botao={this.state.button} />

        <div id="content" className="center-block">
          <button
            type="button"
            id="sidebarCollapse"
            className="btn btn-info navbar-btn"
            onClick={this.changeButton}
          >
            <i className="glyphicon glyphicon-align-left" />
            Toggle Sidebar
          </button>
          <Main />
        </div>
      </div>
    );
  }
}
