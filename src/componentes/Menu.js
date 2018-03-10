import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../public/css/pure.css";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { isBlocking } = this.state;

    return (
      <div>
        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">
              Company
            </a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Formularios
                </a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Filmes
                </a>
              </li>

              <li className="pure-menu-item ">
                <Link href="cadastrosDiretores" to="/home/diretores">
                  Diretores
                </Link>
              </li>

              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
