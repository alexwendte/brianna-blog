import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PostsContext = React.createContext();

class PostsProvider extends Component {
  state = {
    aboutInfo: {},
  };

  componentDidMount() {
    axios
      .get('http://ksurobotics.esy.es/wp-json/wp/v2/pages/105/?_embed')
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
  }

  render() {
    return <PostsContext.Provider value={{ state: this.state }}>{this.props.children}</PostsContext.Provider>;
  }
}

PostsProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { PostsContext, PostsProvider };
