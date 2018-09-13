import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Setting.css';

library.add(faTrash); //adding an icon from FontAwesome to it's library

/*
  This component is being rendered by Settings component, and it represents an interest,
  and a delete button for this interest
*/
class Setting extends Component {

  static propTypes = {
    interest: PropTypes.string,
    deleteInterest: PropTypes.func
  };

  // This function is responsible for deleting this interest for user's interests list
  deleteInterest = () => {
    this.props.deleteInterest(this.props.interest);
  }

  render() {
    return (
      <div className="Settings"> 
        <div className="interest">
          {this.props.interest}
          <FontAwesomeIcon icon="trash" title='Click to delete' onClick={this.deleteInterest} className='delete' />
        </div>
      </div>
    );
  }
}

export default Setting;
