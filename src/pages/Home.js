import React from 'react';

import { PostsContext } from 'modules/PostsContext';

const Home = () => (
  <div>
    Yo
    <PostsContext.Consumer>
      {context => {
        console.log(context);
        return <p>I'm inside the {context.state.age}</p>;
      }}
    </PostsContext.Consumer>
  </div>
);
export default Home;
