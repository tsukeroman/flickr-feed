import React, { Component } from 'react';
import './Feed.css';

class Feed extends Component {

  constructor() {
    super();
    this.state = {
 
    };
  }

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
