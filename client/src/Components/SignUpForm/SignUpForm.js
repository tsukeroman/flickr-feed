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
      NameExistErr: false,
      NoNameErr: false,
      NoPassErr: false,
      NameFormatErr: false,
      PassFormatErr: false
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
    const value = event.target.value;
    if (name === 'Username') {
        this.setState({ [name]: value, NoNameErr: false, NameExistErr: false, 
          NoPassErr: false, NameFormatErr: false,  PassFormatErr: false })
    }
    else {
        this.setState({ [name]: value, NoNameErr: false, 
          NoPassErr: false, NameFormatErr: false, PassFormatErr: false })
    }
  }

  // this function handles a submit, namely a sign-up attempt
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.Username === '') {
      this.setState({ NoNameErr: true })
    } else if (this.validateInput(this.state.Username) === false) {
        this.setState({ NameFormatErr: true });
    }
    else {
      if (this.state.Password === '') {
        this.setState({ NoPassErr: true })
      } else if (this.validateInput(this.state.Password) === false) {
        this.setState({ PassFormatErr: true });
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
            //console.log(res);
            if(res === false) {
              this.setState({ NameExistErr: true })
            } else {
              this.setState({ NameExistErr: false }, () => {
                this.props.AppSignup(res);
              })
            }
          })
      }
    }
  }


  render() {
    return (
     	<div className="SignUpForm">
      		<h1>Sign up</h1>
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
            <div className="tooltip">
              <div className="info"> i </div> 
              <span className="tooltiptext">Username may contain letters, numbers, dash and underscore</span>
            </div>
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
            <div className="tooltip">
              <div className="info"> i </div> 
              <span className="tooltiptext">Password may contain letters, numbers, dash and underscore</span>
            </div>
          </label>
          <br />
          {this.state.NoNameErr && <div className="ErrMsg">Please choose an username</div>}
          {this.state.NoPassErr && <div className="ErrMsg">You have to submit a password</div>}
          {this.state.NameExistErr && <div className="ErrMsg">This username is already exist, please choose another one</div>}
          {this.state.NameFormatErr && <div className="ErrMsg">Username must have no spaces, and may contain only letters, numbers, dash and underscore</div>}
          {this.state.PassFormatErr && <div className="ErrMsg">Password must have no spaces, and may contain only letters, numbers, dash and underscore</div>}
          <input className="submit" type="submit" value="Sign up" />
      		</form>
     	</div>
    );
  }
}

export default SignUpForm;
