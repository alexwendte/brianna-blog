import React, { Component } from 'react';

import { AppContext } from 'modules/AppContext';
import Cloudinary from 'components/Cloudinary';

// This is a page for a specific photo.
class Photo extends Component {
  componentDidUpdate() {
    console.log('Updated');
  }

  render() {
    const competitionsHero = { maxWidth: 0.2, height: 300 };
    const { photoIndex } = this.props;
    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.pictures) {
            const pic = state.pictures[photoIndex];
            if (pic)
              return (
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
            else return <h1>Photo not found</h1>;
            /* 
          const latlng = { lat: modifiedData.latitude, lng: modifiedData.longitude };
          
          window.geocoder.geocode({ location: latlng }, function(results, status) {
            console.log('Geocode!');
            if (status === 'OK') {
              if (results[0]) {
                console.log(results[0].formatted_address);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          }); */
          }
        }}
      </AppContext.Consumer>
    );
  }
}
export default Photo;
