import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userRating, deleteMovie } from "../../../store/actions";
import Rating from "../../Rating/Rating";

const toWatchItem = ({
  id,
  poster_path,
  noteColor,
  vote_average,
  title,
  release_date,
  movieOverwiev,
  deleteMovieHandlerRED,
  userRatingHandlerRED,
}) => {
  return (
    <div className="to-watch__card" key={id}>
      <Link to={`/movies/${id}`}>
        <img
          className="to-watch__movie-cover"
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="movie cover"
        />
      </Link>
      <div className="to-watch__details">
        <Link className="watched__movie-title-link" to={`/movies/${id}`}>
          <h3 className="to-watch__movie-title">"{title}"</h3>
        </Link>
        <div className="to-watch__details-bottom">
          <div className="to-watch__details-bottom-first">
            <p className="to-watch__release-date">Released: {release_date}</p>
            <div style={noteColor} className="to-watch__rating">
              <span className="to-watch__rating-desc">average:</span> {vote_average}
            </div>
          </div>
          <p className="to-watch__desc">{movieOverwiev}</p>
        </div>
      </div>
      <div className="to-watch__actions">
        <span className="btn btn--delete" onClick={() => deleteMovieHandlerRED(id)}>
          delete
        </span>
        <Rating userRatingHandler={e => userRatingHandlerRED(e.target.value, id)} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: (note, id) => dispatch(userRating(note, id)),
    deleteMovieHandlerRED: id => dispatch(deleteMovie(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(toWatchItem);
