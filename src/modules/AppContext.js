import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { map, orderBy } from 'lodash';

import { decodeHtml } from 'utils/string';
import { convertToDateObject } from 'utils/date';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    // aboutInfo: null,
    pictures: null,
    posts: null,
  };

  componentDidMount() {
    /* axios
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
      }); */
    axios
      .get(`${process.env.REACT_APP_WORDPRESS_API}/wp-json/wp/v2/posts/?_embed`)
      .then(res => {
        const initialPosts = res.data;
        const massagedPosts = map(initialPosts, post => {
          const category = post._embedded['wp:term'][0][0].name;
          const featuredMedia = post._embedded['wp:featuredmedia']
            ? post._embedded['wp:featuredmedia'][0]
            : // Else the featured Media comes from our default image.
              {
                source_url: '',
                title: { rendered: 'No Image Available' },
              };
          return {
            id: post.id,
            category,
            date: convertToDateObject({ semiFormatted: post.date }),
            title: decodeHtml(post.title.rendered),
            excerpt: decodeHtml(post.excerpt.rendered),
            slug: post.slug,
            content: post.content.rendered,
            featuredImage: {
              src: featuredMedia.source_url,
              alt: featuredMedia.alt_text || featuredMedia.title.rendered,
              title: featuredMedia.title.rendered,
            },
          };
        });
        const orderedPosts = orderBy(massagedPosts, ['date.fullDate'], ['desc']);

        this.setState({ posts: orderedPosts });
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
          const date = convertToDateObject({ raw: rawTime });
          const returnObj = { src: pic.source_url, alt: pic.alt_text, date, photoIndex: index };
          return returnObj;
        });
        this.setState({ pictures: formattedPictures });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return <AppContext.Provider value={{ state: this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { AppContext, AppProvider };
