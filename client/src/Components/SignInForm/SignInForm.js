import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignInForm.css';

class SignInForm extends Component {

  static propTypes = {
    AppLogin: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      Username: '',
      Password: ''
    };
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = (event) => {
    this.props.AppLogin();
  }

  render() {
    return (
     	<div className="SignInForm">
      		Log In
      		<form onSubmit={this.handleSubmit}>
          <label>
            Username:
      		  <input 
              name='Username'
              className="user" 
              placeholder="Username" 
              value={this.state.Username} 
              onChange={this.handleInputChange} 
            />
      		</label>
          <br />
          <label>
            Password:
      		  <input
              name='Password'
              className="password" 
              type="password"
              placeholder="Password" 
              value={this.state.Password} 
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
      		</form>
     	</div>
    );
  }
}

export default SignInForm;
