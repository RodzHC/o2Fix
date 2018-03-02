import React,{Component} from 'react';
import FormComponent from '../componentes/FormComponent';
export default class Cadastro extends Component {
	render(){
		return (
	      <div>
	          <div className="header">
	            <h1>Cadastro</h1>
	          </div>
	          <div className="content" id="content">
	          </div>
            <FormComponent/>
	      </div>


		);
	}
}
