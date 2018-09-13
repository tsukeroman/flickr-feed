import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './Login.css';

/*
This component is responsible for the log-in and the sign-up, it conditionally
renders each one of them according to 'login' in it's state.
*/
class Login extends Component {

  static propTypes = {
    AppLogin: PropTypes.func,
    AppSignup: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      login: true // if true renders login form, if false renders signup form
    };
  }

  // This function sets 'login' to false, what means that Login will render 
  // a sign-up form now
  toSignup = () => {
    this.setState({ login: false })
  }

  // This function sets 'login' to true, what means that Login will render 
  // a log-in form now
  toLogin = () => {
    this.setState({ login: true })
  }

  // Conditional rendering according to 'login' in state
  render() {
    if(this.state.login) {
      return (
      	<div className='Login'>
  	     	<SignInForm AppLogin={this.props.AppLogin} />
  	     	<div className='Sign'>
  	            Don't have an account? <span className='Link' onClick={this.toSignup}>Sign Up</span> 
  	      </div>
        </div>
      );
    } else {
       return (
        <div className='Login'>
          <SignUpForm AppSignup={this.props.AppSignup} />
          <div className='Sign'>
                Already have an account? <span className='Link' onClick={this.toLogin}>Sign In</span> 
          </div>
        </div>
      );
    }
  }
}

export default Login;
