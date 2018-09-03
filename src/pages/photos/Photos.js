import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from 'modules/AppContext';
import PhotoGallery from 'pages/photos/PhotoGallery';

class Photos extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.pictures) {
            return (
              <PhotosWrapper>
                <h1 className="page-heading">Honeymoon Photos</h1>
                <div className="photoGalleries">
                  <PhotoGallery pictures={state.pictures} month="August" />
                  <PhotoGallery pictures={state.pictures} month="July" />
                </div>
              </PhotosWrapper>
            );
          }
        }}
      </AppContext.Consumer>
    );
  }
}
export default Photos;

const PhotosWrapper = styled.div`
  .page-heading {
    text-align: center;
    color: white;
    background: #333;
    padding: 1rem;
  }
`;
