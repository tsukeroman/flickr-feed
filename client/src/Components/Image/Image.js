import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import Modal from '../Modal/Modal';
import Toastr from 'toastr';
import 'toastr/toastr.css';  

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
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
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
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
    console.log("Image saved to Favorites");
    Toastr.options = {"positionClass": "toast-bottom-left"}
    Toastr.success( 'Image Saved To Favorites');
  }

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
            <button className='image-icon' onClick={this.onFavorite}> Like </button>
          </div>
        </div>
    );
  }
}

export default Image;