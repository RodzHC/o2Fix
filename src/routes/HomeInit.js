import React, { Component } from "react";

export default class HomeInit extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    document.title = "Home";
  }

  render() {
    return (
      <div>
        <div className={`${this.props.headerClass}`}>
          <h1>Bem vindo ao sistema</h1>
        </div>
      </div>
    );
  }
}
