import React, { Component } from "react";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";

import "../public/css/pure.css";
import "../public/css/side-bar.css";

import Pubsub from "pubsub-js";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }
  changeButton() {
    Pubsub.publish("botao-colapse");
  }

  render() {
    return (
      <div>
        <div id="sidebar" className={this.props.botao}>
          <div id="dismiss">
            <i className="glyphicon glyphicon-arrow-left" />
          </div>
          <div id="menuHeader">
            <button
              type="button"
              id="sidebarButton"
              className="btn"
              onClick={this.changeButton.bind(this)}
            >
              <i className="fa fa-bars" />
            </button>
            <h3 className="sidebar-header">O2Fix</h3>
          </div>
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
                className="fa"
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
