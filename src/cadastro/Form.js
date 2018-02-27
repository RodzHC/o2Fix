import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import TratadorErros from  '../TratadorErros';

export default class Form extends Component{

   constructor(){
     super();
     this.state={nome:'',email:'',senha:'',senhaCheck:''};
     this.enviaForm = this.enviaForm.bind(this);
     this.setNome = this.setNome.bind(this);
     this.setEmail = this.setEmail.bind(this);
     this.setSenha = this.setSenha.bind(this);
     this.setSenhaCheck= this.setSenhaCheck.bind(this);
   }

   enviaForm(evento){

     evento.preventDefault();

     $.ajax({
      url:'http://localhost:3001/api/cadastro',
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
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      }
    });    
}

   setNome(evento){
     this.setState({nome:evento.target.value});
   }

   setEmail(evento){
     this.setState({email:evento.target.value});
   }

   setSenha(evento){
     this.setState({senha:evento.target.value});
   }
   setSenhaCheck(evento){
     this.setState({senhaCheck:evento.target.value});
   }

  render(){
    return (
      <form className="pure-form pure-form-aligned form-1" onSubmit={this.enviaForm} method="post">
        <div className="pure-control-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}  />
        </div>
        <div className="pure-control-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}  />
        </div>
        <div className="pure-control-group">
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}  />
        </div>
        <div className="pure-control-group">
          <label htmlFor="senhaCheck">Confirme Senha</label>
          <input id="senhaCheck" type="password" name="senhaCheck" value={this.state.senhaCheck} onChange={this.setSenhaCheck} />
        </div>
        <div className="pure-control-group">
          <label></label>
          <button type="submit" className="pure-button pure-button-primary">Criar Conta</button>
        </div>
      </form>

    )
  }
}
