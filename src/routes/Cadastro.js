import React,{Component} from 'react';
import FormComponent from '../componentes/FormComponent';
import Login from '../componentes/Login';
export default class Cadastro extends Component {
	render(){
		return (
	      <div>
	          <div className="header">
	            <h1>Login/Cadastro</h1>
	          </div>
	          <div className="content" id="content">
	          </div>
						<Login/>
            <FormComponent/>
	      </div>


		);
	}
}
