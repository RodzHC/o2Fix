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
              O2Fix
            </a>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link href="#" className="pure-menu-link" to="/home/filmes">
                  Filmes
                </Link>
              </li>

              <li className="pure-menu-item ">
                <Link href="cadastrosDiretores" to="/home/diretores">
                  Diretores
                </Link>
              </li>

              <li className="pure-menu-item">
                <Link
                  href="#"
                  className="pure-menu-link"
                  to="/home/cadastrodiretores"
                >
                  Cadastro de Diretores
                </Link>
              </li>

              <li className="pure-menu-item">
                <Link
                  href="#"
                  className="pure-menu-link"
                  to="/home/cadastrofilmes"
                >
                  Cadastro de Filmes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
