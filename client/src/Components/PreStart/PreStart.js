import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PreStart.css';
import Choices from '../Choices/Choices';

class PreStart extends Component {

  static propTypes = {
    CompleteRegistration: PropTypes.func,
    Username: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      ChoicesWidth: this.getChoicesWidth(),
      numOfChoices: 0,
      choices: []
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setState({
      ChoicesWidth: document.body.clientWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  getChoicesWidth = () => {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  handleResize = () => this.setState({
      ChoicesWidth: this.getChoicesWidth()
  })

  updateChoices = (val, choices) => {
    this.setState({ numOfChoices: val, choices: choices })
  }

  onSubmitChoices = () => {
    this.props.CompleteRegistration(this.state.choices);
  }

  render() {
    return (
      <div className="PreStart">
        <div className="Hello">
        	<h2>Welcome {this.props.Username}, we are happy to see you!</h2> 
          <span>Before proceeding...  </span>
          <br />
          <span>Let us know what are the 5 (or more) topics that interest you the most</span>
          <br />
          <br />
          <span>Choose please from the following list</span>
        </div>
        {Start(this.state.numOfChoices,this.onSubmitChoices)}
        <Choices ChoicesWidth={this.state.ChoicesWidth} updateChoices={this.updateChoices} />
      </div>
    );
  }
}

const Start = (num, func) => {
  if(num === 0) {
    return <div></div>;
  } else if(num < 5) {
    return <div><h3>Choose {5-num} more :)</h3></div>
  } else {
    return <button className="start" onClick={func}>Lets go!</button>
  }
}

export default PreStart;
