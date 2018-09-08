import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignUpForm.css';

class SignUpForm extends Component {

  static propTypes = {
    AppSignup: PropTypes.func
  };

  /*
  This component is responsible for the sign-up process. In the state we maintain the data from
   the username and the password input fields, and also we keep in the state entries for error handling
   so we can notify the state if an error accured and to show an error message immideately
  */
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      NameUsedErr: false,
      NoNameErr: false,
      NoPassErr: false
    };
  }


  // this function handles any change at the input fields
  handleInputChange = (event) => {
    const name = event.target.name;
    if (name === 'Username') {
      this.setState({ [name]: event.target.value, NoNameErr: false, NameUsedErr: false, NoPassErr: false })
    }
    else {
      this.setState({ [name]: event.target.value, NoNameErr: false, NameUsedErr: false, NoPassErr: false })
    }
  }

  // this function handles a submit, namely a sign-up attempt
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.Username === '') {
      this.setState({ NoNameErr: true })
    }
    else {
      if (this.state.Password === '') {
        this.setState({ NoPassErr: true })
      } else {
        fetch('/Auth/Signup', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Username: this.state.Username, Password: this.state.Password })
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if(!res) {
              this.setState({ NameExistErr: true })
            } else {
              this.setState({ NameExistErr: false }, () => {
                this.props.AppSignup();
              })
            }
          })
      }
    }
  }


  render() {
    return (
     	<div className="SignUpForm">
      		<h3>Sign Up</h3>
      		<form onSubmit={this.handleSubmit}>
          <label>
            Username:
      		  <input 
              name='Username'
              className="user" 
              placeholder="Username" 
              value={this.state.Username} 
              onChange={this.handleInputChange} 
              autoComplete="off"
            />
            <div className="tooltip">
              <div className="info"> i </div> 
              <span className="tooltiptext">dont use ' '</span>
            </div>
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
            <div className="tooltip">
              <div className="info"> i </div> 
              <span className="tooltiptext">dont use ' '</span>
            </div>
          </label>
          <br />
          {this.state.NoNameErr && <div className="ErrMsg">Please choose an username</div>}
          {this.state.NoPassErr && <div className="ErrMsg">You have to submit a password</div>}
          {this.state.NameExistErr && <div className="ErrMsg">This username is already exist</div>}
          <input className="submit" type="submit" value="Submit" />
      		</form>
     	</div>
    );
  }
}

export default SignUpForm;
