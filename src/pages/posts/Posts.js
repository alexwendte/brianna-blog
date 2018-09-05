import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { AppContext } from 'modules/AppContext';
import MonthPosts from './MonthPosts';

const Posts = () => (
  <PostsContainer>
    <Helmet
      title="Posts | Wendte Blog"
      meta={[
        { name: 'description', content: 'Learn about Alex Wendte and Brianna Wendte through their blog.' },
        { name: 'keywords', content: 'Wendte Blog, Alex Wendte, Brianna Wendte' },
      ]}
    />
    <AppContext.Consumer>
      {({ state }) => {
        if (state.posts) {
          return (
            <div className="hello">
              <h1 className="page-heading">Post Catalogue</h1>
              <div className="all-posts">
                <MonthPosts posts={state.posts} month="September" />
                <MonthPosts posts={state.posts} month="August" />
              </div>
            </div>
          );
        }
        return <h1>Loading</h1>;
      }}
    </AppContext.Consumer>
  </PostsContainer>
);
export default Posts;

const PostsContainer = styled.div``;
