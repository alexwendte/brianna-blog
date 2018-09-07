import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cloudinary extends Component {
  render() {
    const { fluid, fixed, source, modifiers, alt, className, keepMeta, handleImageChange } = this.props;
    function getTransformationUrl({ transformations, remoteUrl }) {
      const parsedRemoteUrl = remoteUrl.split('wp-content/uploads/').pop();
      let optimParams;
      if (keepMeta) {
        optimParams = 'q_80,fl_keep_iptc';
      } else optimParams = 'f_auto,q_auto';
      return `https://res.cloudinary.com/wendte-digital-designs/image/upload/${transformations},${optimParams}/remote-media/${parsedRemoteUrl}`;
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
    }

    function getFluidTag() {
      // !Add in a very very low quality fuzzy picture to load first!
      // These are the screen widths we serve different images at
      const breakPoints = [1600, 1366, 1024, 640];
      // the maxWidth is the maximum width that the image can be
      // Ex : Image is only 50% of the screen size, so for a 640px wide device, the image only needs to be 320px
      const scaled = breakPoints.map(point => Math.floor(point * modifiers.maxWidth));
      // Returns the Cloudinary transformations we need for the breakpoints. Height is optional.
      const fluidUrls = scaled.map(point =>
        getTransformationUrl({
          // Width for the break point, optional height, if we need to keep metadata, we can't use c_fill currently
          transformations: `w_${point}${modifiers.height ? `,h_${modifiers.height}` : ''}${keepMeta ? '' : ',c_fill'}`,
          remoteUrl: source,
        })
      );

      const getSizes = () => `(max-width: ${scaled[0]}px) 100vw, ${scaled[0]}px`;
      const getSourceSet = () => fluidUrls.map((url, i) => `${url} ${scaled[i]}w, `).join('');

      return (
        <img
          src={fluidUrls[0]}
          className={className}
          alt={alt}
          sizes={getSizes()}
          srcSet={getSourceSet()}
          onLoad={handleImageChange}
          onError={handleImageChange}
        />
      );
    }

    return fluid ? getFluidTag() : getFixedTag();
  }
}
export default Cloudinary;

Cloudinary.propTypes = {
  fluid: PropTypes.bool,
  fixed: PropTypes.bool,
  source: PropTypes.string.isRequired,
  modifiers: PropTypes.object,
  alt: PropTypes.string,
  className: PropTypes.string,
  keepMeta: PropTypes.bool,
  handleImageChange: PropTypes.func,
};

Cloudinary.defaultProps = {
  fluid: false,
  fixed: false,
  modifiers: {},
  alt: '',
  className: '',
  keepMeta: false,
  handleImageChange: undefined,
};
