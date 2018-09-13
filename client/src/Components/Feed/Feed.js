import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import Gallery from '../Gallery/Gallery';

/*
  This component is the default app components (sits on '/' route), and it 
  shows the user a collection of images based on his interests
*/
class Feed extends Component {

  static propTypes = {
    Username: PropTypes.string,
    getWidth: PropTypes.func
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

  // This function fetch from the server the list of user's interests and puts it in the state
  getInterests = () => {
    fetch(`/Feed/Interests/${this.props.Username}`)
      .then(res => res.json())
      //.then(res => console.log(res.Interests))
      .then(res => this.setState({ interests: res.Interests }))
  }

  // Here we take the list of user's interests from the state, and make a string of interests
  // seperated by a comma, and pass it to the Gallery component which uses this string to
  // fetch the images from Flickr accoring to Flickr's API.
  render() {
    let tags = this.state.interests.join(',');
    return (
      <div className="Feed">
        <div className='upper'>
        	<h2>Hello {this.props.Username},</h2>
          <h3>We have organized for you the latest photos based on your interests</h3>
        </div>
        <Gallery tag={tags} getWidth={this.props.getWidth} />
      </div>
    );
  }
}

export default Feed;
