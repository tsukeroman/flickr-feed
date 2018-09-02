import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInForm from '../SignInForm/SignInForm';
import './Login.css';

class Login extends Component {

  static propTypes = {
    AppLogin: PropTypes.func
  };

  render() {
    return (
    	<div className='Login'>
	     	<SignInForm AppLogin={this.props.AppLogin} />
	     	<div className='SignUp'>
	            Don't have an account? <Link to='#' className='SignUpLink'>Sign Up</Link> 
	      </div>
      </div>
    );
  }
}

export default Login;
