import React, { Component } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import AppContext from 'modules/AppContext';
import PostPhotos from 'pages/photos/PostPhotos';

class Photos extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.posts && state.pictures) {
            return (
              <PhotosWrapper>
                <Helmet
                  title="Photos | Wendte Blog"
                  meta={[
                    { name: 'description', content: 'View Photos of Alex Wendte and Brianna Wendte.' },
                    { name: 'keywords', content: 'Wendte Blog, Alex Wendte, Brianna Wendte' },
                  ]}
                />
                <h1 className="page-heading">Honeymoon Photos</h1>
                <div className="photoGalleries">
                  <PostPhotos posts={state.posts} pics={state.pictures} month="September" />
                  <PostPhotos posts={state.posts} pics={state.pictures} month="August" />
                  <PostPhotos posts={state.posts} pics={state.pictures} month="July" />
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
