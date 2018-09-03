import React from 'react';
import { render, cleanup } from 'react-testing-library';
import PhotoGallery from './PhotoGallery';

afterEach(() => {
  cleanup();
  // console.error.mockClear();
});

test('<PhotoGallery />', () => {
  const { debug } = render(<PhotoGallery />);
  debug();
});
