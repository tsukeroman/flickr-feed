import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import './Choices.css';
import Choice from '../Choice/Choice';

/*
  This component is responsible for showing a collection of topics as 
  possbile interests for the user in the sign-up process. This component
  is rendered by the PreStart component
*/
class Choices extends Component {

  static propTypes = {
    ChoicesWidth: PropTypes.number,
    updateNumOfChoices: PropTypes.func
  };

  // We put in the constructor the list of different topics.
  constructor() {
    super();
    this.list = [
      'Animals', 'Animation', 'Business', 'Cooking', 'Culture', 'Dance', 'Electronics', 
      'Fashion', 'Gaming', 'Jewelry', 'Movies', 'Music', 'Nature', 'Origami', 'Puzzles', 'Science',
      'Sculpting', 'Sports', 'Tourism', 'Yoga'
    ];

    // In the state we put an array "statuses" of booleans. This array is of the same size 
    // as the topics list, each entry in this array represents the status - whether the topic 
    // had been choosen by the user or not, correspoding to the topic index in the topics list
    this.state = {
      statuses:  new Array(this.list.length).fill(false),
    };
  }

  // This function is passed down to the Choice component, which calls it whenver the user choices
  // or un-choices a topic. Then, it calls the updateChoices function that was passed down to Choices
  // component from PreStart in order to update there in state the current number of choosen topics
  updateStatus = (index, bool) => {
  	let i,chosen=0,choices=[];
  	const prevStatus = this.state.statuses;
  	let newStatus = [...(prevStatus.slice(0,index)),bool,...(prevStatus.slice(index+1,prevStatus.length))];
  	this.setState({ statuses: newStatus });
  	for(i=0;i<newStatus.length;i++) {
  		if(newStatus[i]) {
  			chosen+=1;
  			choices = choices.concat(this.list[i]);
  		}
  	}
  	this.props.updateChoices(chosen, choices);
  }

  // React keeps track of the object in the DOM, so it needs that we'll use an 
  // unique key id for every element that we render by Array.map method, and we 
  // use the uuid package for generating such unique id's.
  render() {
    return (
	  <div className='Choices'> 
	    {this.list.map((choice,index) => {
	      return <Choice key={uuid.v4()} choice={choice} screenWidth={this.props.ChoicesWidth}
	        status={this.state.statuses[index]} updateStatus={this.updateStatus} index={index} />
	    })}
	  </div>
    );
  }
}


export default Choices;