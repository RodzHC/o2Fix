import React, { Component } from "react";

import Menu from "../componentes/Menu";
import Main from "./Main";

export default class IndexAdmin extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Main />
      </div>
    );
  }
}
