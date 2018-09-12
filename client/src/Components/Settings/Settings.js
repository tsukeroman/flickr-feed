import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import './Settings.css';
import Setting from '../Setting/Setting';
import Toastr from 'toastr';
import 'toastr/toastr.css'; 

class Settings extends Component {

  static propTypes = {
    Username: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      Interests: [],
      deleteErr: false,
    };
  }

  componentDidMount() {
    this.getInterests();
  }

  getInterests = () => {
    fetch(`/Feed/Interests/${this.props.Username}`)
      .then(res => res.json())
      .then(res => this.setState({ Interests: res.Interests }))
  }

  deleteInterest = (val) => {
    if(this.state.Interests.length <= 5) {
      this.setState({ deleteErr: true })
    } else {
      let newInterests = this.state.Interests.filter(interest => (interest !== val));
      fetch('/Feed/Interests/Delete', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Username: this.props.Username, Interests: newInterests })
      })
        .then(res => this.setState({ Interests: newInterests, deleteErr: false }, () => {
          Toastr.options = {"positionClass": "toast-bottom-left"};
          Toastr.success(`${val} was removed from Interests`);
        }))
    }
  }

  render() {
    return (
      <div className="Settings">
        <h2 className='top'>Manage your interests here</h2>
        {this.state.deleteErr ? 
          (<div className="err"> You should have atleast 5 interests </div>) : (<div></div>)
        }
        <div className="interests">
          {this.state.Interests.map(interest => {
            return <Setting key={uuid.v4()} interest={interest} deleteInterest={this.deleteInterest} />
          })}
        </div>
        <div className='mention'> You can add more interests in 
          <Link to="/Explore" className='goto'> Explore </Link> 
          section </div>
      </div>
    );
  }
}

export default Settings;
