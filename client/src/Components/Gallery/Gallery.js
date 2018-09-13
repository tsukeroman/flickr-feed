import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image/Image';
import uuid from 'uuid';
import './Gallery.css';


/*
  This component represents a collection of images, whether the images the user searched for in
  Explore or the images based on interests in Feed. It fetches the images data from Flickr API
  by the relevant 'tags' and renders them in Image components.
*/
class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    getWidth: PropTypes.func
  };

  // The state maintains the list of images that are viewed on the page,
  // and also maintains all the info that we need for fetching the images from Flickr API and 
  // for the infinite scrolling feature
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      per_page: 100,
      page: 1,
      totalPages: null,
      scrolling: false,
      galleryWidth: this.props.getWidth()
    };
  }

  // Here we add listeners to 'resize' and 'scroll' events, so the component
  // is responsive for such event occurrences.
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

  // Every time that the user inserts a new search value the component fetches the 
  // corresponding images, but it's important to clear the state from the previous
  // images.
  componentWillReceiveProps(props) {
    this.setState({ images: [] }, () => this.getImages(props.tag))
  }

  // This function is reponsible for fetching images from Flickr's API and setting
  // them in the state
  getImages = (tag) => {
    const { per_page, page } = this.state;
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=57b8bb3af162b9c04507be7b6dba0fb8&tags=
    ${tag}&tag_mode=any&per_page=${per_page}&page=${page}&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    
    if(tag === '') {
      this.setState({ images: [] })
    } else {
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
  }

  // This handler is called every time that the screen size changes
  handleResize = () => this.setState({
      galleryWidth: this.props.getWidth()
  });

  // This handler is called every time that the user scrolls over the page,
  // and the infinite scrolling feature is based on it.
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

  // This function load more images whenever the user has scrolled over
  // all the presented images
  loadMore = () => {
    this.setState({
      page: this.state.page + 1,
      scrolling: true
     }, () => this.getImages(this.props.tag))
  };

  // React keeps track of the object in the DOM, so it needs that we'll use an 
  // unique key id for every element that we render by Array.map method, and we 
  // use the uuid package for generating such unique id's.
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