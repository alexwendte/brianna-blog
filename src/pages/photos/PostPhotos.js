import React, { Component, Fragment } from 'react';
// import EXIF from 'exif-js';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import Fixed from 'components/cloudinary/Fixed';
import Spinner from 'components/Spinner';
import { transition, elevation } from 'utils/mixins';
import colors from 'utils/colors';
import { monthsToInt, monthAndDay } from 'utils/date';

function filterByMonth({ arr, month }) {
  return arr.filter(obj => obj.date.month === monthsToInt[month]);
}

class PhotoGallery extends Component {
  state = {
    filteredPosts: filterByMonth({ arr: this.props.posts, month: this.props.month }),
    filteredPics: filterByMonth({ arr: this.props.pics, month: this.props.month }),
    postsAreLoaded: false,
  };

  numPostsLoaded = 0;

  handleImageChange = e => {
    this.numPostsLoaded += 1;
    if (this.numPostsLoaded === this.state.filteredPosts.length) {
      this.setState(() => ({ postsAreLoaded: true }));
    }

    const { naturalHeight: height, naturalWidth: width } = e.target;
    const link = e.target.closest('a');

    const vert = height > width ? 3 : 2;
    const hor = width > height ? 3 : 2;
    link.style.gridColumn = `span ${hor}`;
    link.style.gridRow = `span ${vert}`;
  };

  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.picsAreLoaded === false && this.state.picsAreLoaded) this.state.loadedFunction();
  } */

  render() {
    const { month } = this.props;
    const { filteredPosts, postsAreLoaded, filteredPics } = this.state;
    const postPicture = { width: 250, height: 200 };

    const getCountById = ({ pics, id }) => pics.filter(pic => pic.post === id).length;
    return (
      <Gallery>
        <Spinner loading={!postsAreLoaded}>
          {() => (
            <Fragment>
              <h2 className="heading__gallery">{month} Posts</h2>
              {filteredPosts.map(post => {
                const pic = post.featuredImage;
                const numPics = getCountById({ pics: filteredPics, id: post.id });
                return (
                  <PictureLink to={`posts/${post.id.toString()}`} key={pic.src}>
                    <h4 className="heading__post">{post.title}</h4>
                    <Fixed
                      className="picture"
                      modifiers={postPicture}
                      fluid
                      keepMeta
                      source={pic.src}
                      alt={pic.alt}
                      gridClasses
                      handleImageChange={this.handleImageChange}
                    />
                    <p className="pictureCount">{`${numPics} in this Gallery`}</p>
                  </PictureLink>
                );
              })}
            </Fragment>
          )}
        </Spinner>
      </Gallery>
    );
  }
}
export default PhotoGallery;

PhotoGallery.propTypes = {
  posts: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  pics: PropTypes.array.isRequired,
};

const Gallery = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem 2rem;
  .heading__gallery {
    padding: 2rem;
    text-align: center;
    color: ${colors.seaGreen};
    width: 100%;
  }
`;

const PictureLink = styled(Link)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  margin: 0 2rem;
  border-radius: 5px;
  ${elevation({ level: 4 })};
  ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.3 })};
  .heading__post {
    color: ${colors.coral};
    padding-bottom: 1.5rem;
    font-size: 2rem;
  }
  .picture {
    display: block;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
  }
  .pictureCount {
    padding-top: 1.5rem;
  }
  &:hover {
    transform: rotate(1deg) translateX(-10px) translateY(-10px);
    ${transition({ name: 'easeInCubic', prop: 'all', time: 0.2 })};
  }
`;
