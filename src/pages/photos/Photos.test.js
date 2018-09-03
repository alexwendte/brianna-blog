import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Photos from './Photos';

afterEach(() => {
  cleanup();
  // console.error.mockClear();
});

test('<Photos />', () => {
  const { debug } = render(<Photos />);
  debug();
});
