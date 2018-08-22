import React, { Component } from 'react';
import { Router } from '@reach/router';

import { PostsProvider } from 'modules/PostsContext';
import Home from 'pages/Home';
import AboutUs from 'pages/AboutUs';
import Posts from 'pages/Posts';
import Photos from 'pages/Photos';
import './App.css';

class App extends Component {
  render() {
    return (
      <PostsProvider>
        <Router>
          <Home path="/" />
          <AboutUs path="about-us" />
          <Photos path="photos" />
          <Posts path="posts" />
        </Router>
      </PostsProvider>
    );
  }
}

export default App;
