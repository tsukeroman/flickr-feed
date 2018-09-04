import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image/Image';
import uuid from 'uuid';
import './Gallery.css';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      per_page: 100,
      page: 1,
      totalPages: null,
      scrolling: false,
      galleryWidth: this.getGalleryWidth()
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  getImages(tag) {
    const { per_page, page } = this.state;
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=57b8bb3af162b9c04507be7b6dba0fb8&tags=
    ${tag}&tag_mode=any&per_page=${per_page}&page=${page}&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          if (this.isUnmounted) {
            return;
          }
          this.setState({
            images: [...this.state.images, ...res.photos.photo],
            scrolling: false,
            totalPages: res.photos.total
          });
        }
      });
  }

  handleResize = () => this.setState({
      galleryWidth: this.getGalleryWidth()
  });

  handleScroll = () => {
    const { scrolling, totalPages, page} = this.state;
    if (scrolling) return;
    if (totalPages <= page) return;
    var lastLi = document.querySelector('div.gallery-root:last-child');
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if (pageOffset > lastLiOffset - bottomOffset) {
      this.loadMore()
    }
  };

  loadMore = () => {
    this.setState({
      page: this.state.page + 1,
      scrolling: true
     }, () => this.getImages(this.props.tag))
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    this.isUnmounted = true; // Kills not returned promises
  }

  componentWillReceiveProps(props) {
    this.setState({ images: [] }, () => this.getImages(props.tag))
  }

  render() {
    return (
      <div className="gallery-root">
        {this.state.images.map(dto => {
          return <Image 
                  key={uuid.v4()} 
                  dto={dto} 
                  screenWidth={this.state.galleryWidth} 
                  base='Gallery' 
                />;
        })}
      </div>
    );
  }
}

export default Gallery;