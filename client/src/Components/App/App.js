import React, { Component } from 'react';
import Topbar from '../Topbar/Topbar';
import Main from '../Main/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topbar />
        <Main />
      </div>
    );
  }
}

export default App;
