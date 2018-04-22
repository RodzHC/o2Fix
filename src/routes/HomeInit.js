import React, { Component } from "react";

export default class HomeInit extends Component {
  componentDidMount() {
    document.title = "Home";
  }

  render() {
    return (
      <div>
        <div className="header text-center">
          <h1>Bem vindo ao sistema</h1>
        </div>
      </div>
    );
  }
}
