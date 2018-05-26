import React from 'react';
import { connect } from 'react-redux';
import './WantToWatch.css';
import Rating from '../../Rating/Rating';

const wantToWatch = props => {
  const { wantToWatchRED, userRatingHandlerRED, deleteMovieHandlerRED } = props;
  const moviesToWatch = wantToWatchRED.map(movie => {
    const {
      id,
      poster_path,
      vote_average,
      title,
      release_date,
      overview
    } = movie;

    let movieOverwiev = overview.split(' ');
    movieOverwiev =
      movieOverwiev.length > 40
        ? movieOverwiev.slice(0, 40).join(' ') + '...'
        : movieOverwiev.join(' ');

    const noteBackground = { backgroundColor: '' };
    if (vote_average >= 7) {
      noteBackground.backgroundColor = '#288112';
    } else if (vote_average >= 5) {
      noteBackground.backgroundColor = '#d17e11';
    } else if (vote_average > 0) {
      noteBackground.backgroundColor = '#d11111';
    } else {
      noteBackground.backgroundColor = 'rgba(128, 128, 128, 0.5)';
    }

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
            onClick={() => deleteMovieHandlerRED(id)}>
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
  });

  return (
    <div className="to-watch__wrapper">
      <h2 className="to-watch__title">Want to watch</h2>
      {moviesToWatch}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: (note, id) =>
      dispatch({ type: 'USER_RATING', note: note, id: id }),
    deleteMovieHandlerRED: id => dispatch({ type: 'DELETE_MOVIE', id: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(wantToWatch);
