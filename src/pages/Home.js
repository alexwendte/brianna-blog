import React from 'react';

import { AppContext } from 'modules/AppContext';
import Cloudinary from 'components/Cloudinary';
import { request } from 'https';
const Home = () => (
  <div>
    Yo
    <AppContext.Consumer>
      {({ state }) => {
        if (state.aboutInfo) {
          // takes options first in the "wrapper" function, (what is going to be the same between the two)
          // Then takes other options which is what is different.
          /* const createRequester = options => otherOptions => {
            console.log({ options }, { otherOptions });
            return request(Object.assign({}, options, otherOptions));
          }; */

          const map = fn => arr => arr.map(fn);
          const multiply = x => y => x * y;
          const pluck = key => obj => obj[key];

          const discount = multiply(0.98);
          const tax = multiply(1.0925);

          const collection = [{ price: 4, value: 2 }, { price: 5, value: 2 }, { price: 6, value: 2 }];

          const res = collection.map(pluck('price'));
          const res2 = res.map(discount);
          const res3 = res.map(tax);
          console.log({ res, res2, res3 });

          const competitionsHero = { maxWidth: 0.8, height: 550 };
          return (
            <div className="hello">
              <p>I'm inside the {state.aboutInfo.content}</p>;
              <Cloudinary
                modifiers={competitionsHero}
                fluid
                source={state.aboutInfo.featuredImage.sourceUrl}
                alt={state.aboutInfo.featuredImage.altText}
              />
            </div>
          );
        } else return <h1>Loading</h1>;
      }}
    </AppContext.Consumer>
  </div>
);
export default Home;
