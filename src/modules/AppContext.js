import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    aboutInfo: null,
    pictures: null,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_WORDPRESS_API}/wp-json/wp/v2/pages/152/?_embed`)
      .then(res => {
        const initialInfo = res.data;
        const featuredMedia = initialInfo._embedded['wp:featuredmedia'][0];
        const aboutInfo = {
          title: initialInfo.title.rendered,
          slug: initialInfo.slug,
          acf: initialInfo.acf,
          content: initialInfo.content.rendered,
          featuredImage: {
            sourceUrl: featuredMedia.source_url,
            altText: featuredMedia.alt_text || featuredMedia.title.rendered,
          },
        };
        this.setState({ aboutInfo });
      })
      .catch(err => {
        console.error(err);
      });
    axios
      .get(`${process.env.REACT_APP_WORDPRESS_API}/wp-json/wp/v2/media/?per_page=100`)
      .then(res => {
        const pictures = [...res.data];
        const formattedPictures = pictures.map((pic, index) => {
          const rawTime = pic.media_details.image_meta.created_timestamp;
          const date = this.convertToDateObject({ raw: rawTime });
          const returnObj = { src: pic.source_url, alt: pic.alt_text, date: date, photoIndex: index };
          return returnObj;
        });
        this.setState({ pictures: formattedPictures });
      })
      .catch(err => {
        console.error(err);
      });
  }

  convertToDateObject({ raw }) {
    if (raw === '0') {
      return { fullDate: null, month: 12 }; //The picture's date is not defined
    } else {
      const fullDate = new Date(raw * 1000);
      const month = fullDate.getMonth();
      return { fullDate, month };
    }
  }

  render() {
    return <AppContext.Provider value={{ state: this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { AppContext, AppProvider };
