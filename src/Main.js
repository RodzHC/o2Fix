import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import Cadastro from './routes/Cadastro'


export default class Main extends Component{

render(){
  return(
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/cadastro' component={Cadastro}/>
    </Switch>
  </main>
);
}

}
