import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import Gallery from '../Gallery/Gallery';

class Feed extends Component {

  static propTypes = {
    Username: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      interests: []
    };
  }

  componentDidMount() {
    this.getInterests();
  }

  getInterests = () => {
    fetch(`/Feed/Interests/${this.props.Username}`)
      .then(res => res.json())
      //.then(res => console.log(res.Interests))
      .then(res => this.setState({ interests: res.Interests }))
  }

  render() {
    let tags = this.state.interests.join(',');
    return (
      <div className="Feed">
        <div className='upper'>
        	<h2>Hello {this.props.Username},</h2>
          <h3>We have organized for you the latest photos based on your interests</h3>
        </div>
        <Gallery tag={tags} />
      </div>
    );
  }
}

export default Feed;
