import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { isBlocking } = this.state;

    return (
      <div id="layout">
        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">
              Company
            </a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Home
                </a>
              </li>
              <li className="pure-menu-item">
                <Link href="#" to="/cadastrodiretores">
                  Cadastrar Diretores
                </Link>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Livro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
