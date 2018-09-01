import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: 'block'
    };
  } 

  onCloseModal = () => {
  	this.setState({ display: 'none' }, () => this.props.onClose())
  }

  render() {
  		return (
	      <div className="modal" style={{display: this.state.display}}>
	        <span className="close" onClick={this.onCloseModal}>&times;</span>
	        <img className="modal-content" id="modal-image" src={this.props.src} alt='' />
	        <div id="bottomPadding"></div>
	      </div>
    	);	
  }
}

export default Modal;


      