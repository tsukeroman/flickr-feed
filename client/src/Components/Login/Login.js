import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './Login.css';

class Login extends Component {

  static propTypes = {
    AppLogin: PropTypes.func,
    AppSignup: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      login: true // if true render login form, if false render signup form
    };
  }

  toSignup = () => {
    this.setState({ login: false })
  }

  toLogin = () => {
    this.setState({ login: true })
  }

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
