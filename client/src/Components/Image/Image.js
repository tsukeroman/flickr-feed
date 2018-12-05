import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import Modal from '../Modal/Modal';
import Toastr from 'toastr';
import 'toastr/toastr.css';  

/*
  This components is responsible to represent an image by it's Flickr url
*/
class Image extends React.Component {
  static propTypes = {
    obj: PropTypes.object,
    screenWidth: PropTypes.number,
    base: PropTypes.string,
    onRemoveImage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      size: 200,
      isOpen: false
    };
  }

  componentDidMount() {
    this.getSize();
  }

  componentWillReceiveProps(props) {
    this.getSize();
  }

  // This function calculates the image size when the app loads and updates 
  // the 'size' entry in state after every screen resize event
  getSize = () => {
    const {screenWidth} = this.props;
    const targetSize = 200;
    const imagesInRow = Math.round(screenWidth / targetSize);
    const size = (screenWidth / imagesInRow);
    this.setState({
      size
    });
  }

  // This function constructs the url of the image by it's info object
  urlFromObj = (obj) => {
    return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}.jpg`;
  }

  // This function is responisble for showing an image in a larger view
  onExpand = () => {
    this.setState({ isOpen: true })
  }

  // This function is responsible to close the larger view that has been triggered by
  // the onExpand function 
  onClose = () => {
    this.setState({ isOpen: false })
  }

  // This function is calls the server whenever the user has liked an image
  // in order to save the image in user's favorites
  // when the server responses, this function shows a toastr massage
  onFavorite = () => {
    const Image = this.props.obj;
    fetch('/Favorites/Add', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...Image })
    })
    .then(res => res.json())
    .then((res) => {
      if(res.length) {
        /*console.log("Image saved to Favorites");*/
        Toastr.options = {"positionClass": "toast-bottom-left"};
        Toastr.success( 'Image Saved To Favorites');
      }
      else {
        /*console.log("Image is already in Favorites");*/
        Toastr.options = {"positionClass": "toast-bottom-left"};
        Toastr.info('Image is already in Favorites');
      }
    });
  };

  // This function is calls the server whenever the user has un-liked an image
  // in order to delete the image from favorites
  offFavorite = () => {
    const Image = this.props.obj;
    fetch('/Favorites/Remove', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...Image })
    }).then(() => {
      this.props.onRemoveImage();
      /*console.log("Image removed from Favorites");*/
      Toastr.options = {"positionClass": "toast-bottom-left"}
      Toastr.success('Image removed from Favorites');
    });
  };

  // We render by conditional rendering a modal for viewing pictures on a larger view, 
  // it's status is maintained in the component state. Also we use conditional rendering 
  // to determine whether to show a "like" button for an image in Explore area, or to show
  // an "un-like" button for an image in Favorites
  render() {
    return (
        <div
          className="image"
          style={{
            backgroundImage: `url(${this.urlFromObj(this.props.obj)})`,
            width: this.state.size + 'px',
            height: this.state.size + 'px'
          }}
          >
          <span> {this.state.isOpen && <Modal src={this.urlFromObj(this.props.obj)} onClose={this.onClose} />} </span>
          <div>
            <button className='imageBtn' onClick={this.onExpand}> Expand </button>
            {(this.props.base === 'Images') ? <button className='imageBtn' onClick={this.onFavorite}> Like </button> : <div></div>}
            {(this.props.base === 'Favorites') ? <button className='imageBtn' onClick={this.offFavorite}> Unlike </button> : <div></div>}
          </div>
        </div>
    );
  }
}

export default Image;