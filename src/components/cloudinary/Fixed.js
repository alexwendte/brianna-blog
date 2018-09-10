import React from 'react';
import PropTypes from 'prop-types';

const Fixed = ({ source, modifiers, alt, className, keepMeta, handleImageChange }) => {
  function getTransformationUrl({ transformations, remoteUrl }) {
    const parsedRemoteUrl = remoteUrl.split('wp-content/uploads/').pop();
    let optimParams;
    if (keepMeta) {
      optimParams = 'q_80,fl_keep_iptc';
    } else optimParams = 'f_auto,q_auto';
    return `https://res.cloudinary.com/wendte-digital-designs/image/upload/${transformations},${optimParams}/remote-media/${parsedRemoteUrl}`;
  }

  const modifiersArray = [
    { ...modifiers },
    { width: modifiers.width * 2, height: modifiers.height * 2, borderRadius: modifiers.borderRadius * 2 },
  ];
  const urls = modifiersArray.map(mod =>
    getTransformationUrl({
      transformations: `w_${mod.width},h_${mod.height}${mod.borderRadius ? `,r_${mod.borderRadius}` : ''}${
        keepMeta ? '' : ',c_fill'
      }`,
      remoteUrl: source,
    })
  );
  const getSrcSet = () => `${urls[0]}, ${urls[1]} 2x`;

  return (
    <img
      className={className}
      src={urls[0]}
      alt={alt}
      srcSet={getSrcSet()}
      onLoad={handleImageChange}
      onError={handleImageChange}
    />
  );
};
export default Fixed;

Fixed.propTypes = {
  source: PropTypes.string.isRequired,
  modifiers: PropTypes.object,
  alt: PropTypes.string,
  className: PropTypes.string,
  keepMeta: PropTypes.bool,
  handleImageChange: PropTypes.func,
};

Fixed.defaultProps = {
  modifiers: undefined,
  alt: '',
  className: '',
  keepMeta: false,
  handleImageChange: undefined,
};
