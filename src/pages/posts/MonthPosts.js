import React, { Component } from 'react';
// import EXIF from 'exif-js';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import Cloudinary from 'components/Cloudinary';
import { transition, media, elevation } from 'utils/mixins';
import colors from 'utils/colors';

class MonthPosts extends Component {
  months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  render() {
    const { posts, month } = this.props;
    const competitionsHero = { maxWidth: 0.2, height: 300 };

    return (
      <Block>
        <h2 className="heading">Posts from {month} </h2>
        {posts &&
          posts.reduce((filtered, post) => {
            if (post.date.month === this.months[month]) {
              const pic = post.featuredImage;
              filtered.push(
                <Link to={post.slug} key={post.slug} className="picture-link">
                  <h4>{post.title}</h4>
                  <Cloudinary
                    className="picture"
                    modifiers={competitionsHero}
                    fluid
                    keepMeta
                    source={pic.src}
                    alt={pic.alt}
                  />
                  <p>{post.excerpt}</p>
                </Link>
              );
            }
            return filtered;
          }, [])}
      </Block>
    );
  }
}
export default MonthPosts;

MonthPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
};

const Block = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 auto;
  .heading {
    padding-top: 2rem;
    text-align: center;
    color: ${colors.seaGreen};
    width: 100%;
  }

  .picture-link {
    margin: 2rem;
  }

  .picture {
    border-radius: 20px;
    ${elevation({ level: 4 })};
    ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.3 })};
    display: block;
    text-align: center;
    width: 30rem;
    h3 {
      color: purple;
      font-size: 2rem;
      padding-bottom: 2rem;
      padding-top: 0.5rem;
    }
    &:hover {
      transform: rotate(1deg) translateX(-10px) translateY(-10px);
      ${transition({ name: 'easeInCubic', prop: 'all', time: 0.2 })};
    }
  }
`;
