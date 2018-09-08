import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

/*
  componentDidMount() {
    this.CheckIfLogged();
  }

  CheckIfLogged = () => {
    fetch('/Auth/Profile')
      .then(res => res.json())
      .then(res => {
        if(res) {
          this.setState({ isLogged: true })
        } else {
          this.setState({ isLogged: false })
        }
      })
  }
*/

/*
The following function modify wether the user is logged or not by changing 'isLogged' in state,
which initially set to be false, i.e. not logged. Any log-in/log-out followed by a redirect to 
the main page of the app.
*/
  AppLogin = () => {
  	this.setState({ isLogged: true }, () => {console.log('LOGGED IN !'); return <Redirect to='/' />});
  }

  AppLogout = () => {

  	this.setState({ isLogged: false }, () => {console.log('LOGGED OUT !'); return <Redirect to='/' />});
  }

  AppSignup = () => {
    this.setState({ isLogged: true }, () => {console.log('USER CREATED AND LOGGED IN !'); return <Redirect to='/' />});
  }

// We perform a conditional rendering, which depends on user's log status
	render() {

  	let res = this.state.isLogged ?
      	(<div className="App">
        	<Topbar AppLogout={this.AppLogout} />
        	<Main />
      	</div>) :
      	(<div className="App">
        	<Login AppLogin={this.AppLogin} AppSignup={this.AppSignup} />
      	</div>);
    return res;
	}
}

export default App;
