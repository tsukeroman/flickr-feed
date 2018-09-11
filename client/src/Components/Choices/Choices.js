import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import './Choices.css';
import Choice from '../Choice/Choice';

class Choices extends Component {

  static propTypes = {
    ChoicesWidth: PropTypes.number,
    updateNumOfChoices: PropTypes.func
  };

  constructor() {
    super();
    this.list = [
      'Animals', 'Animation', 'Business', 'Cooking', 'Culture', 'Dance', 'Electronics', 
      'Fashion', 'Gaming', 'Jewelry', 'Movies', 'Music', 'Nature', 'Origami', 'Puzzles', 'Science',
      'Sculpting', 'Sports', 'Tourism', 'Yoga'
    ];

    this.state = {
      statuses:  new Array(this.list.length).fill(false),
    };
  }

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

  render() {
   
    //onClick={this.onSubmitChoices}

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