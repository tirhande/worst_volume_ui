import React from 'react';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  // https://codepen.io/vchgekmq-the-flexboxer/pen/MWLVJeO?editors=1111

  return (
    <div>
      Intro 페이지
      <Link to={'mic-volume'}>hello</Link>
    </div>
  );
};

export default IntroPage;
