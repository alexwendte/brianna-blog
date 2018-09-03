import React, { Component } from 'react';
import { Router } from '@reach/router';

import { AppProvider } from 'modules/AppContext';
import Home from 'pages/Home';
import AboutUs from 'pages/AboutUs';
import Posts from 'pages/Posts';
import Photos from 'pages/photos/Photos';
import Photo from 'pages/photos/Photo';
import './App.css';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Home path="/" />
          <AboutUs path="about-us" />
          <Photos path="photos" />
          <Photo path="photos/:photoIndex" />
          <Posts path="posts" />
        </Router>
      </AppProvider>
    );
  }
}

export default App;
