import React, { Fragment } from "react";
import WantToWatch from "../../components/Bookmarks/WantToWatch/WantToWatch";
import Watched from "../../components/Bookmarks/Watched/Watched";
import Favourites from "../../components/Bookmarks/Favourites/Favourites";

const mainPage = props => {
  return (
    <Fragment>
      <WantToWatch
        movies={props.wantToWatch}
        userRatingHandler={(value, movieId) =>
          props.userRatingHandler(value, movieId)
        }
      />
      <Watched movies={props.watched} />
      <Favourites movies={props.favourites} />
    </Fragment>
  );
};

export default mainPage;
