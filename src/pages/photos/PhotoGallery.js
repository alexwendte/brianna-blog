import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import AppContext from 'modules/AppContext';
import Fluid from 'components/cloudinary/Fluid';
import Spinner from 'components/Spinner';
import { transition, elevation } from 'utils/mixins';
import colors from 'utils/colors';

class PhotoGallery extends Component {
  state = {
    picsAreLoaded: false,
    numberOfPics: undefined,
  };

  numPicsLoaded = 0;

  handleImageChange = e => {
    this.numPicsLoaded += 1;
    if (this.numPicsLoaded === this.state.numberOfPics) {
      this.setState(() => ({ picsAreLoaded: true }));
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

  //! Figure this out. Maybe with CDU??
  filterPics({ pics, postId }) {
    const res = pics.filter(pic => pic.post === Number(postId));
    this.setState(prev => {
      console.log('Setting State');
      //! prev.numberOfPics && { numberOfPics: res.length };
    });
    return res;
  }

  render() {
    const { postId } = this.props;
    const { picsAreLoaded } = this.state;
    const gridPicture = { maxWidth: 0.2 };

    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.pictures) {
            const filteredPics = this.filterPics({ pics: state.pictures, postId });
            return (
              <Gallery>
                <Spinner loading={!picsAreLoaded}>
                  {() => (
                    <Fragment>
                      <h2 className="heading__gallery">{postId} Photos</h2>
                      {filteredPics.map(pic => (
                        <PictureLink to={pic.photoIndex.toString()} key={pic.src}>
                          <Fluid
                            className="picture"
                            modifiers={gridPicture}
                            fluid
                            keepMeta
                            source={pic.src}
                            alt={pic.alt}
                            gridClasses
                            handleImageChange={this.handleImageChange}
                          />
                        </PictureLink>
                      ))}
                    </Fragment>
                  )}
                </Spinner>
              </Gallery>
            );
          }
          return <h1>Loading</h1>;
        }}
      </AppContext.Consumer>
    );
  }
}
export default PhotoGallery;

PhotoGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: auto;
  grid-auto-rows: 150px;
  grid-auto-flow: dense;
  justify-content: center;
  padding: 3rem 2rem;
  overflow: hidden;
  .heading__gallery {
    padding-top: 2rem;
    text-align: center;
    color: ${colors.seaGreen};
    width: 100%;
    grid-column: 1 / -1;
  }
`;

const PictureLink = styled(Link)`
  overflow: hidden;
  padding: 1rem;
  height: 100%;
  .picture {
    border-radius: 20px;
    ${elevation({ level: 2 })};
    ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.3 })};
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    h3 {
      color: purple;
      font-size: 2rem;
      padding-bottom: 2rem;
      padding-top: 0.5rem;
    }
    &:hover {
      transform: rotate(1deg) translateX(-10px) translateY(-10px);
      ${transition({ name: 'easeInCubic', prop: 'all', time: 0.2 })};
    }
  }
`;
