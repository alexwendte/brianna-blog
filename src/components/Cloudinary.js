import React from 'react';
import PropTypes from 'prop-types';

const Cloudinary = ({ fluid, fixed, source, modifiers, alt, className, keepMeta, onLoad, onError }) => {
  function getTransformationUrl({ transformations, remoteUrl }) {
    const parsedRemoteUrl = remoteUrl.split('wp-content/uploads/').pop();
    let optimParams;
    if (keepMeta) {
      optimParams = 'q_80,fl_keep_iptc';
    } else optimParams = 'f_auto,q_auto';
    return `http://res.cloudinary.com/wendte-digital-designs/image/upload/${transformations},${optimParams}/remote-media/${parsedRemoteUrl}`;
  }

  function getFixedTag() {
    const modifiersArray = [
      { ...modifiers },
      { width: modifiers.width * 2, height: modifiers.height * 2, borderRadius: modifiers.borderRadius * 2 },
    ];
    const urls = modifiersArray.map(mod =>
      getTransformationUrl({
        transformations: `w_${mod.width},h_${mod.height},r_${mod.borderRadius},c_fill`,
        remoteUrl: source,
      })
    );
    const getSrcSet = () => `${urls[0]}, ${urls[1]} 2x`;

    return <img className={className} src={urls[0]} alt={alt} srcSet={getSrcSet()} onLoad={onLoad} onError={onError} />;
  }

  function getFluidTag() {
    // !Add in a very very low quality fuzzy picture to load first!
    const breakPoints = [1600, 1366, 1024, 640];
    // want breakPoints to be predictable the correct width
    const scaled = breakPoints.map(point => Math.floor(point * modifiers.maxWidth));
    const fluidUrls = scaled.map(point => {
      if (keepMeta) {
        return getTransformationUrl({
          transformations: `w_${point},h_${modifiers.height}`,
          remoteUrl: source,
        });
      }
      return getTransformationUrl({
        transformations: `w_${point},h_${modifiers.height},c_fill`,
        remoteUrl: source,
      });
    });

    const getSizes = () => `(max-width: ${scaled[0]}px) 100vw, ${scaled[0]}px`;
    const getSourceSet = () => fluidUrls.map((url, i) => `${url} ${scaled[i]}w, `).join('');

    return (
      <img
        src={fluidUrls[0]}
        className={className}
        alt={alt}
        sizes={getSizes()}
        srcSet={getSourceSet()}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
  if (fluid) return getFluidTag();
  else if (fixed) return getFixedTag();
  return <h2>Fail</h2>;
};
export default Cloudinary;

Cloudinary.propTypes = {
  fluid: PropTypes.bool,
  fixed: PropTypes.bool,
  source: PropTypes.string.isRequired,
  modifiers: PropTypes.object,
  alt: PropTypes.string,
  className: PropTypes.string,
  keepMeta: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

Cloudinary.defaultProps = {
  fluid: false,
  fixed: false,
  modifiers: {},
  alt: '',
  className: '',
  keepMeta: false,
  onLoad: null,
  onError: null,
};
