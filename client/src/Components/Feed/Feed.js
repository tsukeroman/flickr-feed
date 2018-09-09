import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Feed.css';

class Feed extends Component {

  constructor() {
    super();
    this.state = {
 
    };
  }

  static propTypes = {
    Username: PropTypes.string
  };

  render() {
    return (
      <div className="Feed">
      	<h1>Feed</h1>
      	Hello {this.props.Username}, nice to see you!
      </div>
    );
  }
}

export default Feed;
