import React, { Component } from "react";

import Menu from "../componentes/Menu";
import Main from "./Main";

import Pubsub from "pubsub-js";

export default class IndexAdmin extends Component {
  constructor() {
    super();
    this.state = { button: "" };
  }

  changeButton() {
    this.props.store.dispatch(dispach => {
      dispach({ type: "CHANGE" });
    });
    // Pubsub.publish("botao-colapse");
  }
  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState({ button: this.props.store.getState().botao });
    });
  }

  render() {
    console.log(`Store do botao: ${this.props.store.getState().botao}`);
    return (
      <div className="wrapper">
        <Menu store={this.props.store} />

        <div id="content" className={this.state.button}>
          <button
            type="button"
            id="sidebarCollapse"
            className="btn btn-info navbar-btn"
            onClick={this.changeButton.bind(this)}
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
