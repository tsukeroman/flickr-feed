import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';
import Login from '../Login/Login';
import Main from '../Main/Main';
import PreStart from '../PreStart/PreStart';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLogged:  false,
      CompletedReg: false,
      Username: ''
    };
  }

  componentDidMount() {
    this.CheckIfLogged();
  }

  CheckIfLogged = () => {
    fetch('/Auth/Profile')
      .then(res => res.json())
      .then(res => {
        if(res) {
          if (res.CompletedReg) {
            this.setState({ isLogged: true, CompletedReg: true })
          } else {
            this.setState({ isLogged: true, CompletedReg: false })
          }
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
  	this.setState({ isLogged: true, Username: user.Username, CompletedReg: user.CompletedReg }, () => {
      /*console.log(`LOGGED IN AS ${this.state.Username}!`);*/ 
      return <Redirect to='/' />
    });
  }

  AppLogout = () => {
    fetch('/Auth/Logout');
  	this.setState({ isLogged: false, Username:'', CompletedReg: false }, () => {
      /*console.log('LOGGED OUT !');*/ 
      return <Redirect to='/' />
    });
  }

  AppSignup = (user) => {
    this.setState({ isLogged: true, Username: user.Username, CompletedReg: false }, () => {
      /*console.log('USER CREATED AND LOGGED IN !');*/ 
      return <Redirect to='/' />
    });
  }

  CompleteRegistration = (choices) => {
    fetch('/Auth/Complete', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Username: this.state.Username, CompletedReg: true, Interests: choices })
    })
      .then(this.setState({ CompletedReg: true }))
  }

// We perform a conditional rendering, which depends on user's log status
	render() {
    if(this.state.isLogged) {
      if(this.state.CompletedReg) {
        return (
          <div className="App">
            <Topbar AppLogout={this.AppLogout} />
            <Main Username={this.state.Username} />
          </div>
        );
      }
      else {
        return (
          <PreStart CompleteRegistration={this.CompleteRegistration} Username={this.state.Username} />
        );
      }
    }
    else {
      return (
        <div className="App">
          <Login AppLogin={this.AppLogin} AppSignup={this.AppSignup} />
        </div>
      );
    }
	}
}

export default App;
