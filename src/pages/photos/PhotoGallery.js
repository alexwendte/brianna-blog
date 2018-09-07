import React, { Component } from 'react';
// import EXIF from 'exif-js';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import Cloudinary from 'components/Cloudinary';
import { transition, media, elevation } from 'utils/mixins';
import colors from 'utils/colors';

class PhotoGallery extends Component {
  months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  handleImageChange = e => {
    const { naturalHeight: height, naturalWidth: width } = e.target;
    const link = e.target.closest('a');

    const vert = height > width ? 3 : 2;
    const hor = width > height ? 3 : 2;
    link.style.gridColumn = `span ${hor}`;
    link.style.gridRow = `span ${vert}`;

    // Add classes here.
  };

  render() {
    const { pictures, month } = this.props;
    // const competitionsHero = { maxWidth: 0.2, height: 300 };
    const gridPicture = { maxWidth: 0.2 };

    return (
      <Gallery>
        <h2 className="heading">{month} Photos</h2>
        {pictures &&
          pictures.reduce((filtered, pic) => {
            if (pic.date.month === this.months[month]) {
              filtered.push(
                <Link to={pic.photoIndex.toString()} key={pic.src} className="picture-link">
                  <Picture>
                    <Cloudinary
                      className="picture"
                      modifiers={gridPicture}
                      fluid
                      keepMeta
                      source={pic.src}
                      alt={pic.alt}
                      gridClasses
                      handleImageChange={this.handleImageChange}
                    />
                  </Picture>
                </Link>
              );
            }
            return filtered;
          }, [])}
      </Gallery>
    );
  }
}
export default PhotoGallery;

PhotoGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
};

const Gallery = styled.section`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */
  /* I want the horizontal pictres to be twice the widht, and the vertical pictures to be twice the height. I need to tell Cloudinary this.*/
  display: grid;
  grid-template-columns: repeat(auto-fill, 110px);
  grid-template-rows: auto;
  grid-auto-rows: 110px;
  grid-auto-flow: dense;
  justify-content: center;
  /*grid-gap: 2rem;*/
  padding: 3rem 2rem;
  overflow: hidden;
  .heading {
    padding-top: 2rem;
    text-align: center;
    color: ${colors.seaGreen};
    width: 100%;
    grid-column: 1 / -1;
  }
  .picture-link {
    overflow: hidden;
    padding: 1rem;
  }
`;

const Picture = styled.div`
  height: 100%;
  .picture {
    border-radius: 20px;
    ${elevation({ level: 4 })};
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
