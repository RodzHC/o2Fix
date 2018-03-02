import React, { Component } from 'react';
import './css/normalize.css';
import './css/pure.css';
import './css/bootstrap-theme.css';
import './css/side-bar.css'
import './index.css'


import Main from './Main';
import Menu from './Menu';
class App extends Component {

  render() {
    return (
    <div id="layout">
      <Menu/>
      <Main/>
    </div>
    );
  }
}

export default App;
