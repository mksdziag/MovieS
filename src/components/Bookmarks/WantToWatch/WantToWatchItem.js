import React from "react";
import { connect } from "react-redux";
import Rating from "../../Rating/Rating";
import * as actionTypes from "../../../store/actionTypes";

const wantToWatchItem = ({
  id,
  poster_path,
  noteBackground,
  vote_average,
  title,
  release_date,
  movieOverwiev,
  deleteMovieHandlerRED,
  userRatingHandlerRED
}) => {
  return (
    <div className="to-watch__item" key={id}>
      <div className="to-watch__cover-wrapper">
        <img
          className="to-watch__movie-cover"
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="movie cover"
        />
        <span
          className="to-watch__delete"
          onClick={() => deleteMovieHandlerRED(id)}
        >
          &#10006;
        </span>
        <span style={noteBackground} className="to-watch__note">
          {vote_average}
        </span>
        <Rating
          userRatingHandler={e => userRatingHandlerRED(e.target.value, id)}
        />
      </div>
      <div>
        <h3 className="to-watch__movie-title">"{title}"</h3>
        <p className="to-watch__release-date">Released: {release_date}</p>
        <p className="to-watch__desc">{movieOverwiev}</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: (note, id) =>
      dispatch({ type: actionTypes.USER_RATING, note: note, id: id }),
    deleteMovieHandlerRED: id =>
      dispatch({ type: actionTypes.DELETE_MOVIE, id: id })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(wantToWatchItem);
