import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import Modal from '../Modal/Modal';
import Toastr from 'toastr';
import 'toastr/toastr.css';  

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    screenWidth: PropTypes.number,
    base: PropTypes.string,
    onRemoveImage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      isOpen: false
    };
  }

  calcImageSize() {
    const {screenWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(screenWidth / targetSize);
    const size = (screenWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  componentWillReceiveProps(props) {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  onExpand = () => {
    this.setState({ isOpen: true })
  }

  onClose = () => {
    this.setState({ isOpen: false })
  }

  onFavorite = () => {
    const Image = this.props.dto;
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
        console.log("Image saved to Favorites");
        Toastr.options = {"positionClass": "toast-bottom-left"}
        Toastr.success( 'Image Saved To Favorites');
      }
      else {
        console.log("Image is already in Favorites");
        Toastr.options = {"positionClass": "toast-bottom-left"}
        Toastr.info('Image is already in Favorites');
      }
    });
  };

  offFavorite = () => {
    const Image = this.props.dto;
    fetch('/Favorites/Remove', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...Image })
    }).then(() => {
      this.props.onRemoveImage();
      console.log("Image removed from Favorites");
      Toastr.options = {"positionClass": "toast-bottom-left"}
      Toastr.success('Image removed from Favorites');
    });
  };

  render() {
    return (
        <div
          className="image-root"
          style={{
            backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
            width: this.state.size + 'px',
            height: this.state.size + 'px'
          }}
          >
          <span> {this.state.isOpen && <Modal src={this.urlFromDto(this.props.dto)} onClose={this.onClose} />} </span>
          <div>
            <button className='image-icon' onClick={this.onExpand}> Expand </button>
            {(this.props.base === 'Gallery') ? <button className='image-icon' onClick={this.onFavorite}> Like </button> : <div></div>}
            {(this.props.base === 'Favorites') ? <button className='image-icon' onClick={this.offFavorite}> Unlike </button> : <div></div>}
          </div>
        </div>
    );
  }
}

export default Image;