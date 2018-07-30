import React, { Fragment } from "react";
import ToWatch from "../../components/Bookmarks/ToWatch/ToWatch";
import Watched from "../../components/Bookmarks/Watched/Watched";
import Favourites from "../../components/Bookmarks/Favourites/Favourites";

const mainPage = props => {
  return (
    <Fragment>
      <ToWatch />
      <Watched />
      <Favourites />
    </Fragment>
  );
};

export default mainPage;
