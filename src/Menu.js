import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Menu extends Component {

  render(){

    return(

      <div>
            <a href="#menu" id="menuLink" className="menu-link">
                <span></span>
            </a>

            <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#">Company</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><Link href="#" className="pure-menu-link" to='/'>Home</Link></li>
                        <li className="pure-menu-item"><Link href="#" className="pure-menu-link" to='/cadastro'>Login</Link></li>
                        <li className="pure-menu-item"><Link href="#" className="pure-menu-link" to='/diretores'>Diretores</Link></li>


                    </ul>
                </div>
            </div>
      </div>
      );

  }
}
