import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import insane from 'insane';

import AppContext from 'modules/AppContext';
import Fluid from 'components/cloudinary/Fluid';
import Icon from 'components/Icon';
import colors from 'utils/colors';

// This is a page for a specific Post.
class Post extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const postHeroImage = { maxWidth: 0.4, height: 400 };
    const { postSlug } = this.props;

    function handleBackClick() {
      window.history.back();
    }

    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.posts) {
            const post = find(state.posts, { slug: postSlug });
            const pic = post.featuredImage;
            if (post) {
              return (
                <div className="page">
                  <BackButton className="back" onClick={handleBackClick}>
                    <Icon className="icon" name="back" color="#CF6776" />
                    <span className="text">Back</span>
                  </BackButton>
                  <PostWrapper>
                    <div className="picture-element">
                      <h1>{post.title}</h1>
                      <Fluid
                        className="picture"
                        modifiers={postHeroImage}
                        keepMeta
                        source={pic.src}
                        alt={pic.alt}
                        key={pic.src}
                        handleImageChange={this.handleImageChange}
                      />
                      <div className="content" dangerouslySetInnerHTML={{ __html: insane(post.content) }} />
                    </div>
                  </PostWrapper>
                </div>
              );
            }
            return <h1>Post not found</h1>;
          }
        }}
      </AppContext.Consumer>
    );
  }
}

export default Post;

Post.propTypes = {
  postSlug: PropTypes.string,
};

Post.defaultProps = {
  postSlug: '',
};

const PostWrapper = styled.div`
  padding: 0 3rem 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .map {
    width: 600px;
    height: 400px;
    background: ${colors.lightGray};
    margin-left: 2rem;
  }
  .extra-info {
    padding-left: 3rem;
  }
  @media (max-width: 1350px) {
    .picture {
      width: 800px;
      height: 600px;
      max-width: 100%;
      margin: 0 auto;
      display: block;
    }
    .map {
      width: 800px;
      height: 533px;
      margin-left: 0rem;
      margin-top: 3rem;
    }
  }
`;

const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 5px;
  display: flex;
  margin-left: 3rem;
  margin-top: 2rem;
  transition: transform 0.2s ease-in;
  svg {
    height: 3.2rem;
    width: 3.2rem;
  }
  .text {
    color: #cf6776;
    font-size: 1.8rem;
    font-weight: 600;
    margin-left: 1rem;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`;
