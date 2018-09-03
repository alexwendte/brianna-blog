import React, { Component } from 'react';
import EXIF from 'exif-js';
import styled from 'styled-components';

import Cloudinary from 'components/Cloudinary';

class PhotoGallery extends Component {
  state = {
    metaPictures: [],
  };

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

  getExif() {
    const images = Array.from(document.querySelectorAll('.picture'));
    images.map(img => {
      EXIF.getData(img, function() {
        // console.dir(this);
        const allMetaData = EXIF.getAllTags(this);
        const myData = {
          date: allMetaData.DateTime,
          camera: allMetaData.Model,
          latitude: allMetaData.GPSLatitude,
          longitude: allMetaData.GPSLongitude,
          bearing: allMetaData.GPSDestBearing,
          altitude: allMetaData.GPSAltitude,
          alt: this.alt,
          src: this.currentSrc,
        };
        if (myData.latitude) {
          const modifiedData = {
            ...myData,
            latitude: myData.latitude[0] + myData.latitude[1] / 60 + myData.latitude[2] / 3600,
            longitude: myData.longitude[0] + myData.longitude[1] / 60 + myData.longitude[2] / 3600,
          };
        }
        console.log(myData);
        // console.log(this);
        // console.log(myData);
      });
    });
  }

  handleClick = () => {
    this.getExif();
  };

  render() {
    const { pictures, month } = this.props;
    const competitionsHero = { maxWidth: 0.2, height: 300 };
    //! Need to get meta data.
    // Figure out how I should get each images data from exif

    return (
      <Gallery>
        <h2 className="heading">{month} Photos</h2>
        {pictures &&
          pictures.reduce((filtered, pic) => {
            if (pic.date.month === this.months[month])
              filtered.push(
                <Cloudinary
                  className="picture"
                  modifiers={competitionsHero}
                  fluid
                  keepMeta
                  source={pic.src}
                  alt={pic.alt}
                  key={pic.src}
                />
              );
            return filtered;
          }, [])}
        <button onClick={this.handleClick} />
      </Gallery>
    );
  }
}
export default PhotoGallery;

const Gallery = styled.div`
  .heading {
    padding-top: 2rem;
    text-align: center;
    color: #66b9bf;
    width: 100%;
  }
  .picture {
    margin: 2rem;
    border-radius: 5px;
    box-shadow: 0 15px 35px rgba(69, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
