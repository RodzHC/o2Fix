import React, { Component } from "react";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";

import "../public/css/pure.css";
import "../public/css/side-bar.css";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="sidebar" className={this.props.botao}>
          <h3 className="sidebar-header">O2Fix</h3>
          <ul className="list-unstyled components">
            <li className="active">
              <Link href="#" className="pure-menu-link" to="/home/filmes">
                Filmes
              </Link>
            </li>

            <li className="pure-menu-item ">
              <Link href="#" to="/home/diretores">
                Diretores
              </Link>
            </li>
            <li>
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
              >
                Administracao
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <Link href="#" to="/home/cadastrodiretores">
                    Cadastro de Diretores
                  </Link>
                </li>

                <li>
                  <Link href="#" to="/home/cadastrofilmes">
                    Cadastro de Filmes
                  </Link>
                </li>

                <li>
                  <Link href="#" to="/home/userm">
                    User Management
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <LogoutButton />
        </div>
      </div>
    );
  }
}
