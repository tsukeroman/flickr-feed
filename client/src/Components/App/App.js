import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';
import Login from '../Login/Login';
import Main from '../Main/Main';
import PreStart from '../PreStart/PreStart';
import './App.css';


/*
The main component of the application, responsible for loging in, signing up and
running the app for a signed user.
*/
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

  // This function is responsible for checking the screen width in order to 
  // optimally fit the images size to the screen
  getWidth = () => {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  // This function talks to the server, and checks whether the user is logged in and
  // completed his registration, logged in and hadn't completed the registration, or
  // isn't logged in
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


  // This function is responsible for logging the user in, by changing 'isLogged' in state to true,
  // and 'CompletedReg' to it's status according to the server response to CheckIfLogged function
  // log-in,log-out and sign-up are followed by a redirect to the main page of the app.
  AppLogin = (user) => {
  	this.setState({ isLogged: true, Username: user.Username, CompletedReg: user.CompletedReg }, () => {
      /*console.log(`LOGGED IN AS ${this.state.Username}!`);*/ 
      return <Redirect to='/' />
    });
  }

  // This function is responsible for logging the user out, by changing 'isLogged' in state to true,
  // and CompletedReg to false.
  AppLogout = () => {
    fetch('/Auth/Logout');
  	this.setState({ isLogged: false, Username:'', CompletedReg: false }, () => {
      /*console.log('LOGGED OUT !');*/ 
      return <Redirect to='/' />
    });
  }

  // This function is responsible for signing-up the user, by changing 'isLogged' to true and 
  // 'CompletedReg' to false, so the app knows could know that the user exist and signed-in, but
  // still has to complete the registration process.
  AppSignup = (user) => {
    this.setState({ isLogged: true, Username: user.Username, CompletedReg: false }, () => {
      /*console.log('USER CREATED AND LOGGED IN !');*/ 
      return <Redirect to='/' />
    });
  }

  // This function notifies the server that the user has completed his registration process,
  // so the server can write this change to the database, and then the function updates 
  // the 'CompletedReg' in state to true, so the user could proceed in to the app
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

  // We perform a conditional rendering, which depends on whether the user is logged in or not,
  // and if he has already completed he's registration process or he have to go over this before 
  // he could use the app.
	render() {
    if(this.state.isLogged) {
      if(this.state.CompletedReg) {
        return (
          <div className="App">
            <Topbar AppLogout={this.AppLogout} getWidth={this.getWidth} />
            <Main Username={this.state.Username} getWidth={this.getWidth} />
          </div>
        );
      }
      else {
        return (
          <PreStart CompleteRegistration={this.CompleteRegistration} Username={this.state.Username} getWidth={this.getWidth} />
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
