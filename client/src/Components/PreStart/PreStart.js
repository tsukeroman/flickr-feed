import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PreStart.css';
import Choices from '../Choices/Choices';

/*
  This component is responsible for welcoming the user when after he sign-ups,
  and getting from him atleast 5 of his interests.
*/
class PreStart extends Component {

  static propTypes = {
    CompleteRegistration: PropTypes.func,
    Username: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      numOfChoices: 0,
      choices: []
    };
  }

  // This function updates in the state the number of choices that are 
  // currently marked by the user
  updateChoices = (val, choices) => {
    this.setState({ numOfChoices: val, choices: choices })
  }

  // This function is responsible for submitting user's choices in order 
  // to complete the registration
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
        <Choices updateChoices={this.updateChoices} />
      </div>
    );
  }
}

// This function is a stateless component that we pass in the number of interests 
// that the user has marked and a submit function, and then, if the user marked less
// then 5 interests the components presents a message with the number of interests
// that remained to the user to mark, or otherwise, the component presents a button
// that a clicking on it completes the sign-up process
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
