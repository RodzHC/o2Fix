import React,{Component} from 'react';
import '../css/bootstrap-theme.css';
import {Link} from 'react-router-dom';
export default class Home extends Component {
	render(){
		return (
	      <div>
	          <div className="header">
	            <h1>Bem vindo ao sistema</h1>
	          </div>
	          <div className="content" id="content">
	          </div>
						<div className="flex">
								<button className="pure-button pure-button-primary flex-item"><Link href="#" className="pure-button pure-button-primary flex-item" to='/cadastro'>Fazer Login</Link></button>
								<button className="pure-button pure-button-primary flex-item"><Link href="#" className="pure-button pure-button-primary flex-item" to='/cadastro'>Se Cadastrar</Link></button>
							</div>

				</div>

		);
	}
}
