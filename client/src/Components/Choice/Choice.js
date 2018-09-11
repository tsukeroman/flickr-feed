import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Choice.css';
import Animals from './images/Animals.jpg';
import Animation from './images/Animation.jpg';
import Business from './images/Business.jpg';
import Cooking from './images/Cooking.jpg';
import Culture from './images/Culture.jpg';
import Dance from './images/Dance.jpg';
import Electronics from './images/Electronics.jpg';
import Fashion from './images/Fashion.jpg';
import Gaming from './images/Gaming.jpg';
import Jewelry from './images/Jewelry.jpg';
import Movies from './images/Movies.jpg';
import Music from './images/Music.jpg';
import Nature from './images/Nature.jpg';
import Origami from './images/Origami.jpg';
import Puzzles from './images/Puzzles.jpg';
import Science from './images/Science.jpg';
import Sculpting from './images/Sculpting.jpg';
import Sports from './images/Sports.jpg';
import Tourism from './images/Tourism.jpg';
import Yoga from './images/Yoga.jpg';


class Choice extends Component {

  static propTypes = {
    choice: PropTypes.string,
    screenWidth: PropTypes.number,
    status: PropTypes.bool,
    updateStatus: PropTypes.func,
    index: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      size: 200,
    };
  }

  offChoice = () => {
    this.props.updateStatus(this.props.index, false)
  }

  onChoice = () => {
    this.props.updateStatus(this.props.index, true)
  }

  calcChoiceSize = () => {
    const {screenWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(screenWidth / targetSize);
    const size = (screenWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  serveUrl = (choice) => {
    if(choice === 'Animals') {
      return `url(${Animals})`;
    } else if (choice === 'Animation') {
      return `url(${Animation})`;
    } else if (choice === 'Business') {
      return `url(${Business})`;
    } else if (choice === 'Cooking') {
      return `url(${Cooking})`;
    } else if (choice === 'Culture') {
      return `url(${Culture})`;
    } else if (choice === 'Dance') {
      return `url(${Dance})`;
    } else if (choice === 'Electronics') {
      return `url(${Electronics})`;
    } else if (choice === 'Fashion') {
      return `url(${Fashion})`;
    } else if (choice === 'Gaming') {
      return `url(${Gaming})`;
    } else if (choice === 'Jewelry') {
      return `url(${Jewelry})`;
    } else if (choice === 'Movies') {
      return `url(${Movies})`;
    } else if (choice === 'Music') {
      return `url(${Music})`;
    } else if (choice === 'Nature') {
      return `url(${Nature})`;
    } else if (choice === 'Origami') {
      return `url(${Origami})`;
    } else if (choice === 'Puzzles') {
      return `url(${Puzzles})`;
    } else if (choice === 'Science') {
      return `url(${Science})`;
    } else if (choice === 'Sculpting') {
      return `url(${Sculpting})`;
    } else if (choice === 'Sports') {
      return `url(${Sports})`;
    } else if (choice === 'Tourism') {
      return `url(${Tourism})`;
    } else if (choice === 'Yoga') {
      return `url(${Yoga})`;
    } 
  }

  render() {
    if(this.props.status) {
    return (
        <button className="Choice" onClick={this.offChoice}
          style={{
            backgroundImage: this.serveUrl(this.props.choice),
            filter: 'brigthness(110%)',
            width: this.state.size + 'px',
            height: this.state.size + 'px'
          }}>
          <div className='Chosen'>CHOSEN</div>
        </button>
    )} else {
      return (
        <button className="Choice" onClick={this.onChoice}
          style={{
            backgroundImage: this.serveUrl(this.props.choice),
            filter: 'grayscale(15%)',
            width: this.state.size + 'px',
            height: this.state.size + 'px'
          }}>
          <div className='NotChosen'>{this.props.choice}</div>
        </button>
    )}
  }
}

export default Choice;
