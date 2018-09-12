import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Setting.css';

library.add(faTrash);

class Settings extends Component {

  static propTypes = {
    interest: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      
    };
  }

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

export default Settings;
