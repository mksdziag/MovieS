import React from 'react';
import './Watched.css';
import { connect } from 'react-redux';

const watched = props => {
  const { watchedRED } = props;
  const watchedList = watchedRED.map(movie => {
    const { id, poster_path, vote_average, my_note, title } = movie;
    const noteBackground = { backgroundColor: 'rgba(128, 128, 128, 0.5)' };
    if (movie.vote_average >= 7) {
      noteBackground.backgroundColor = '#288112';
    } else if (movie.vote_average >= 5) {
      noteBackground.backgroundColor = '#d17e11';
    } else if (movie.vote_average > 0) {
      noteBackground.backgroundColor = '#d11111';
    }

    return (
      <div className="watched__item" key={id}>
        <div className="watched__cover-wrapper">
          <img
            className="watched__movie-cover"
            src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="movie cover"
          />

          <span style={noteBackground} className="watched__movie-note">
            {vote_average}
          </span>
          <span className="watched__my-note">{my_note}</span>
        </div>
        <div>
          <h3 className="watched__movie-title">"{title}"</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="watched__section-wrapper">
      <h2 className="watched__section-title">Watched movies</h2>
      <ul className="watched__list">{watchedList}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched
  };
};

export default connect(mapStateToProps)(watched);
