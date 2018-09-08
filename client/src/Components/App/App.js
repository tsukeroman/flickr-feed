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
      isLogged:  false,
      Username: ''
    };
  }

  componentDidMount() {
    this.CheckIfLogged();
  }

  CheckIfLogged = () => {
    console.log('got here');
    fetch('/Auth/Profile')
      .then(res => res.json())
      .then(res => {
        if(res) {
          this.setState({ isLogged: true })
        } else {
          this.setState({ isLogged: false })
        }
        return res;
      })
      .then(res => this.setState({ Username: res.Username }));
  }

/*
The following function modify wether the user is logged or not by changing 'isLogged' in state,
which initially set to be false, i.e. not logged. Any log-in/log-out followed by a redirect to 
the main page of the app.
*/
  AppLogin = (user) => {
  	this.setState({ isLogged: true, Username: user.Username }, () => {
      console.log(`LOGGED IN AS ${this.state.Username}!`); return <Redirect to='/' />
    });
  }

  AppLogout = () => {
    fetch('/Auth/Logout');
  	this.setState({ isLogged: false }, () => {
      console.log('LOGGED OUT !'); return <Redirect to='/' />
    });
  }

  AppSignup = (user) => {
    this.setState({ isLogged: true, Username: user.Username }, () => {
      console.log('USER CREATED AND LOGGED IN !'); return <Redirect to='/' />
    });
  }

// We perform a conditional rendering, which depends on user's log status
	render() {

  	let res = this.state.isLogged ?
      	(<div className="App">
        	<Topbar AppLogout={this.AppLogout} />
        	<Main Username={this.state.Username} />
      	</div>) :
      	(<div className="App">
        	<Login AppLogin={this.AppLogin} AppSignup={this.AppSignup} />
      	</div>);
    return res;
	}
}

export default App;
