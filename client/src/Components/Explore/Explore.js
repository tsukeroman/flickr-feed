import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './Explore.css';
import Search from '../Search/Search';
import Images from '../Images/Images';
import Toastr from 'toastr';
import 'toastr/toastr.css'; 

library.add(faCaretDown); //adding an icon from FontAwesome to it's library


/*
This component is responsible for the Explore area of the app. On it's top there is a search field,
represented by the Search component, and under the search there is the Images component which shows
the images that were fetched from Flickr accordingly to the search value.
This "container" component for search and images, allows us to add complexed features to 
each of them, to manipulate each state without causing re-render to both, and keep the code organaized. 
*/
class Explore extends Component {

	static propTypes = {
	    Username: PropTypes.string
	}

	constructor() {
		super();
		this.state = {
			tag: ''
		};
	}

	/* 
		This function is responsible for setting the search value that we'll be passed to Images
		in state, but it does it in a delayed manner, i.e. it waits 0.5sec after the user stops typing 
		before it manipulates the state. It's a good practise that helps us to avoid unnecessary calls 
		to a remote API after each key press
	*/
	onSearchChange = (value) => {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.typingTimeout = setTimeout(function() {
      this.setState({ tag: value })
      }.bind(this), 500);
  	};

  	// This function tells the server to add the current search value ('tag' from state) to 
  	// user's interests list. After the server responses, a toastr massage appears on the 
  	// bottom-left corner of the screen
  	addInterest = () => {
  		let tag = this.state.tag;
  		tag = tag.charAt(0).toUpperCase() + tag.slice(1);

      	fetch('/Feed/Interests/Add', {
	        method: 'post',
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({ Username: this.props.Username, newInterest: tag })
	    })	
	    	.then(res => res.json())
	    	.then(res => {
	    		if(res) {
	    			Toastr.options = {"positionClass": "toast-bottom-left"};
        			Toastr.success(`${tag} was added to your Interests`);
        		} else {
        			Toastr.options = {"positionClass": "toast-bottom-left"};
        			Toastr.info(`${tag} is already in your Interests`);
        		}
	    	})
	}

	// There are some suggestions under the search bar, and the way they are rendered depends
	// on the size of the screen. Both of the ways are rendered, but whether they are displayed 
	// or not, is determined in the Explore.css file by the screen width.
	// If there search bar isn't empty, there is an option to add the search value to user's
	// interests list.
	render() {
		return (
			<div className="Explore">
				<Search onSearchChange={this.onSearchChange} onSuggestion={this.state.tag} />
				<div className='Suggestions'> 
					<button className='sug button' onClick={()=>this.setState({tag: 'culture'})}>Culture</button>
					<button className='sug button' onClick={()=>this.setState({tag: 'science'})}>Science</button>
					<button className='sug button' onClick={()=>this.setState({tag: 'music'})}>Music</button>
					<button className='sug button' onClick={()=>this.setState({tag: 'business'})}>Business</button>
					<button className='sug button' onClick={()=>this.setState({tag: 'sports'})}>Sports</button>
					<button className='sug button' onClick={()=>this.setState({tag: 'tourism'})}>Tourism</button>
				</div>
				<div className='SuggestionsMenu'>
					<button className='sug button'> 
					Suggestions <FontAwesomeIcon icon="caret-down" />
					</button>
					<div className='MenuContent'>
						<button className='button MenuButton' onClick={()=>this.setState({tag: 'culture'})}>Culture</button>
						<button className='button MenuButton' onClick={()=>this.setState({tag: 'science'})}>Science</button>
						<button className='button MenuButton' onClick={()=>this.setState({tag: 'music'})}>Music</button>
						<button className='button MenuButton' onClick={()=>this.setState({tag: 'business'})}>Business</button>
						<button className='button MenuButton' onClick={()=>this.setState({tag: 'sports'})}>Sports</button>
						<button className='button MenuButton' onClick={()=>this.setState({tag: 'tourism'})}>Tourism</button>
					</div>
				</div>
				{this.state.tag ? 
			        (<div><button className='sug button2' onClick={this.addInterest}>
			        	Add {this.state.tag.charAt(0).toUpperCase() + this.state.tag.slice(1)} to your interests
			        </button></div>)
			         : 
			        (<div></div>)
			    }
				<Images tag={this.state.tag} />
			</div>
		);
	}
}

export default Explore;
