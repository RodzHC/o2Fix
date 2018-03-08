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
      <div>
        <div id="menu">
          <div class="pure-menu">
            <a class="pure-menu-heading" href="#">
              Company
            </a>

            <ul class="pure-menu-list">
              <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">
                  Formularios
                </a>
              </li>
              <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">
                  Filmes
                </a>
              </li>

              <li class="pure-menu-item ">
                <Link
                  href="cadastrosDiretores"
                  to="/cadastrodiretores"
                  class="pure-menu-link"
                >
                  Diretores
                </Link>
              </li>

              <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">
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
