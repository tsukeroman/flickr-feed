import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import './Settings.css';
import Setting from '../Setting/Setting';
import Toastr from 'toastr';
import 'toastr/toastr.css'; 


/*
  This component is responsible for user's settings management. Currently, 
  the only thing that the user can manage is his interests by deleting an
  interest that he doesn't need any more
*/
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

  // This function is responsible for fetching the list of user's interests from 
  // the server and putting it in the state
  getInterests = () => {
    fetch(`/Feed/Interests/${this.props.Username}`)
      .then(res => res.json())
      .then(res => this.setState({ Interests: res.Interests }))
  }

  // This function is responsible for telling the server to the delete an interest
  // from user's interests list. It's done by creating a new list of interest, 
  // excluding the interest that is going to be deleted, and passing it to the server,
  // which is going to replace the list in database by the new one.
  // After the delete, a toastr massage will appear in the bottom-left corner of the 
  // screen. If the user has 5 or less interests, the delete won't succeed, and an
  // error flag will be raised in the state.
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
          Toastr.success(`${val} was removed from your Interests`);
        }))
    }
  }

  // React keeps track of the object in the DOM, so it needs that we'll use an 
  // unique key id for every element that we render by Array.map method, and we 
  // use the uuid package for generating such unique id's.
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
