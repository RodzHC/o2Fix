import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import TratadorErros from  '../TratadorErros';
import InputCustomizado from './InputCustomizado';
export default class FormComponent extends Component{

   constructor(){
     super();
     this.state={email:'',senha:''};
     this.enviaForm = this.enviaForm.bind(this);

     this.setEmail = this.setEmail.bind(this);
     this.setSenha = this.setSenha.bind(this);

   }

   enviaForm(evento){

     evento.preventDefault();

     $.ajax({
      url:'http://localhost:3001/api/login',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success: function(novaListagem){
        console.log('Entrei!');
        PubSub.publish('atualiza-lista-autores',novaListagem);
        this.setState({nome:'',email:'',senha:''});
      }.bind(this),
      error: function(resposta){

        if(resposta.status === 400) {
          console.log(resposta.responseJSON);
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      }
    });
}


   setEmail(evento){
     this.setState({email:evento.target.value});
   }

   setSenha(evento){
     this.setState({senha:evento.target.value});
   }


  render(){
    return (
      <div className="teste">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
           <div className="pure-control-group">
             <label></label>
             <button type="submit" className="pure-button pure-button-primary">Login</button>
           </div>

        </form>
      </div>
    )
  }
}
