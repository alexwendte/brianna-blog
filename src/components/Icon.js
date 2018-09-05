import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, color }) => {
  switch (name) {
    case 'back':
      return (
        <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="512" height="512" fill="black" fillOpacity="0" />
          <circle cx="256" cy="256" r="256" fill={color} />
          <rect width="358.4" height="302.193" fill="black" fillOpacity="0" transform="translate(83.6265 104.96)" />
          <rect x="93.0132" y="234.667" width="349.013" height="42.6667" rx="21.3333" fill="white" />
          <rect
            x="83.6265"
            y="255.809"
            width="213.333"
            height="42.6667"
            rx="21.3333"
            transform="rotate(-45 83.6265 255.809)"
            fill="white"
          />
          <rect
            x="113.796"
            y="226.133"
            width="213.333"
            height="42.6667"
            rx="21.3333"
            transform="rotate(45 113.796 226.133)"
            fill="white"
          />
        </svg>
      );

    default:
      return '';
  }
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
