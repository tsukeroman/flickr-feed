import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignInForm.css';

class SignInForm extends Component {

  static propTypes = {
    AppLogin: PropTypes.func
  };

  /*
  This component is responsible for the sign-in process. In the state we maintain the data from
   the username and the password input fields, and also we keep in the state entries for error handling
   so we can notify the state if an error accured and to show an error message immideately
  */
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      NoNameErr: false,
      NoPassErr: false,
      PassErr: false
    };
  }

  validateInput = (str) => {
    const Restricted = `., !?;:"'~@#$%^&*+=/|<>(){}[]`;
    let i;
    for(i=0;i<Restricted.length;i++) {
      if(str.indexOf(Restricted[i]) !== -1) {
        return false;
      }
    }
    return true;
  }

  // this function handles any change at the input fields
  handleInputChange = (event) => {
    const name = event.target.name;
    if (name === 'Username') {
      this.setState({ [name]: event.target.value, NoNameErr: false, NoPassErr: false, PassErr: false })
    }
    else {
      this.setState({ [name]: event.target.value, NoNameErr: false, NoPassErr: false, PassErr: false })
    }
  }

  // this function handles a submit, namely a sign-in attempt
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.Username === '') {
      this.setState({ NoNameErr: true, PassErr: false, NoPassErr: false })
    }
    else {
      if (this.state.Password === '') {
        this.setState({ NoPassErr: true, PassErr: false, NoNameErr: false })
      } else if (this.validateInput(this.state.Username) === false) {
        this.setState({ Username: '', Password: '', PassErr: true })
      } else {
        fetch('/Auth/Signin', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Username: this.state.Username, Password: this.state.Password })
        })
          .then(res => res.json())
          .then(res => {
            if(res) {
              this.props.AppLogin(res);
            } else {
              this.setState({ Username: '', Password: '', PassErr: true })
            }
          });
      }
    }
  }

  render() {
    return ( 
     	<div className="SignInForm">
      		<h1>Log in to Flickr-Feed</h1>
      		<form onSubmit={this.handleSubmit}>
          <label>
      		  <input 
              name='Username'
              className="user" 
              placeholder="Username" 
              value={this.state.Username} 
              onChange={this.handleInputChange} 
              autoComplete="off"
            />
      		</label>
          <br />
          <label>
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
          {this.state.NoNameErr && <div className="ErrMsg">Please submit a username</div>}
          {this.state.NoPassErr && <div className="ErrMsg">You have to submit a password</div>}
          {this.state.PassErr && <div className="ErrMsg">The password doesn't match the username, try again</div>}
          <input className="submit" type="submit" value="Log in" />
      		</form>
     	</div>
    );
  }
}

export default SignInForm;
