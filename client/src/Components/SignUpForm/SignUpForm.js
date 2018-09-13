import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignUpForm.css';

/*
  This component is responsible for the sign-up process. In the state we maintain the data from
  'Username' and 'Password' input fields, and also we keep in the state entries for error handling
  so we can notify the state if an error occured and then to render an error message immideately
*/
class SignUpForm extends Component {

  static propTypes = {
    AppSignup: PropTypes.func
  };

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

  // To prevent any kind of "sql-injection" alike atacks, I block input with special 
  // characters on the front-end, e.g. the server would not get any harmful inputs 
  // from the client, which could be proceeded later to the database and cause troubles
  validateInput = (str) => {
    const Restricted = `., !?;:"'~@#$%^&*+=/|<>(){}[]\\`;
    let i;
    for(i=0;i<Restricted.length;i++) {
      if(str.indexOf(Restricted[i]) !== -1) {
        return false;
      }
    }
    return true;
  }

  // This function handles any change in the input fields
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

  // This function handles a submit, namely a sign-up attempt.
  // The various possible scenarious are:
  // *the user hasn't submitted a username
  // *the username that the user submitted has a not valid format
  // *the user hasn't submitted a password
  // If none of these happened, this function talks to the server, and checks
  // whether the username is taken, if yes, sets an error in the state,
  // otherwise - the user is created and being proceed in to the app.
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

  // All the potential errors are conditionally rendered accordingly to the state
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
