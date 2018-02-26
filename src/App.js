import React, { Component } from 'react';
import './css/normalize.css';
import './css/pure.css';
import './css/side-bar.css'
import './index.css'
import Form from './cadastro/Form.js';
class App extends Component {

  render() {
    return (
      <div id="layout">

    <a href="#menu" id="menuLink" className="menu-link">

        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>


            </ul>
        </div>
    </div>

        <div className="main" id="main">
            <div className="header">
              <h1>Cadastro</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
              <Form/>
              </div>
              <div className="tabela-nomes">
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Alberto</td>
                      <td>alberto.souza@caelum.com.br</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


</div>
    );
  }
}

export default App;
