import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { Helmet } from 'react-helmet';

import { AppContext } from 'modules/AppContext';
import Cloudinary from 'components/Cloudinary';

const Home = () => (
  <HomeContainer>
    <Helmet
      title="Home | Wendte Blog"
      meta={[
        { name: 'description', content: 'Learn about Alex Wendte and Brianna Wendte through their blog.' },
        { name: 'keywords', content: 'Wendte Blog, Alex Wendte, Brianna Wendte' },
      ]}
    />
    <AppContext.Consumer>
      {({ state }) => {
        if (state.posts) {
          const competitionsHero = { maxWidth: 0.8, height: 550 };
          return (
            <div className="hello">
              <h1>Home</h1>
              <Cloudinary
                modifiers={competitionsHero}
                fluid
                source={`${process.env.REACT_APP_WORDPRESS_API}/wp-content/uploads/2018/08/TheWendtes-Mended.jpg`}
                alt="&quot;The Wendtes&quot; written in sand on a beach"
                className="home-image"
              />
              <div className="recent-posts">
                <h3>Checkout our most recent posts!</h3>
                <ul className="list">
                  {state.posts.map(post => (
                    <li className="item" key={post.id}>
                      <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        return <h1>Loading</h1>;
      }}
    </AppContext.Consumer>
  </HomeContainer>
);
export default Home;

const HomeContainer = styled.div`
  .home-image {
    margin: 2rem auto;
    display: block;
  }
`;
