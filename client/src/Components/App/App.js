import React, { Component } from 'react';
import Topbar from '../Topbar/Topbar';
import Login from '../Login/Login';
import Main from '../Main/Main';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  AppLogin = () => {
  	this.setState({ isLogged: true }, console.log('LOGGED IN !'));
  }

  AppLogout = () => {
  	this.setState({ isLogged: false }, console.log('LOGGED OUT !'));
  }

  	render() {
    	let res = this.state.isLogged ?
	      	(<div className="App">
	        	<Topbar AppLogout={this.AppLogout} />
	        	<Main />
	      	</div>) :
	      	(<div className="App">
	        	<Login AppLogin={this.AppLogin} />
	      	</div>);
	    return res;
	}
}

export default App;
