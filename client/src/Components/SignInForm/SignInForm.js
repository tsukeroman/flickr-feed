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
      Password: '',
      NoNameErr: false,
      PassErr: false
    };
  }

  CheckLogin = ((user,password) => {
    return true;
  });

  handleInputChange = (event) => {
    const name = event.target.name;
    if (name === 'Username') {
      this.setState({ [name]: event.target.value, NoNameErr: false })
    }
    else {
      this.setState({ [name]: event.target.value })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.Username === '') {
      this.setState({ NoNameErr: true })
    }
    else {
      if (this.CheckLogin(this.state.Username, this.state.Password) === false) {
        this.setState({ PassErr: true })
      } else {
        this.props.AppLogin();
      }
    }
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
          {this.state.NoNameErr && <div className="ErrMsg">Please submit username</div>}
          {this.state.PassErr && <div className="ErrMsg">The password doesn't match username</div>}
          <input className="submit" type="submit" value="Submit" />
      		</form>
     	</div>
    );
  }
}

export default SignInForm;
