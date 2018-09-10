import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import { AppProvider } from 'modules/AppContext';
import Home from 'pages/Home';
import AboutUs from 'pages/AboutUs';
import Posts from 'pages/posts/Posts';
import Post from 'pages/posts/Post';
import Photos from 'pages/photos/Photos';
import Photo from 'pages/photos/Photo';
import PhotoGallery from 'pages/photos/PhotoGallery';
import Header from './Header';
import Footer from './Footer';

const App = () => (
  <Fragment>
    <Router>
      <Header path="/*" />
    </Router>
    <AppProvider>
      <Router primary={false}>
        <Home path="/" />
        <AboutUs path="about-us" />
        <Photos path="photos" />
        <PhotoGallery path="photos/:postSlug" />
        <Photo path="photos/:postSlug/:photoIndex" />
        <Posts path="posts" />
        <Post path="posts/:postSlug" />
      </Router>
    </AppProvider>
    <Router primary={false}>
      <Footer path="/*" />
    </Router>
  </Fragment>
);

export default App;
