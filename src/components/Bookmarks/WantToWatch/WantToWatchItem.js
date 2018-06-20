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
    <div className="to-watch__card" key={id}>
      <img
        className="to-watch__movie-cover"
        src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="movie cover"
      />
      <div className="to-watch__details">
        <h3 className="to-watch__movie-title">"{title}"</h3>
        <div className="to-watch__details-bottom">
          <div className="to-watch__details-bottom-first">
            <p className="to-watch__release-date">Released: {release_date}</p>
            <div style={noteBackground} className="to-watch__rating">
              <span className="to-watch__rating-desc">average:</span>{" "}
              {vote_average}
            </div>
          </div>
          <p className="to-watch__desc">{movieOverwiev}</p>
        </div>
      </div>
      <div className=" to-watch__actions">
        <span
          className="btn btn--delete"
          onClick={() => deleteMovieHandlerRED(id)}
        >
          delete
        </span>

        <Rating
          userRatingHandler={e => userRatingHandlerRED(e.target.value, id)}
        />
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
