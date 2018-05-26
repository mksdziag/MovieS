import React, { Fragment } from 'react';
import WantToWatch from '../../components/Bookmarks/WantToWatch/WantToWatch';
import Watched from '../../components/Bookmarks/Watched/Watched';
import Favourites from '../../components/Bookmarks/Favourites/Favourites';

const mainPage = props => {
  return (
    <Fragment>
      <WantToWatch />
      <Watched />
      <Favourites />
    </Fragment>
  );
};

export default mainPage;
