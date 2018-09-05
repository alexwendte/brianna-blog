import React from 'react';
import Helmet from 'react-helmet';

const Posts = () => (
  <div>
    <Helmet
      title="Posts | Wendte Blog"
      meta={[
        { name: 'description', content: 'Learn about Alex Wendte and Brianna Wendte through their blog.' },
        { name: 'keywords', content: 'Wendte Blog, Alex Wendte, Brianna Wendte' },
      ]}
    />
    <h1>Posts</h1>
  </div>
);
export default Posts;
