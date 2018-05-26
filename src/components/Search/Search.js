import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Search.css';
import Rating from '../Rating/Rating';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findedMovies: []
    };
  }

  searchForMoviesHandler = e => {
    const searchedWord = e.target.value;
    this.getMovie(searchedWord);
  };

  getMovie = keyWord => {
    const apiKey = '5c390ea5f7529cd1cce0e1069df56f5b';
    const baseUrl = 'https://api.themoviedb.org/3/';
    const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${keyWord}`;

    axios(url)
      .then(response => {
        const moviesArr = response.data.results;
        moviesArr.filter(movie => movie);
        this.setState((prevState, currState) => {
          return { findedMovies: moviesArr };
        });
      })
      .catch(err => err);
  };

  wantToWatchHandler = id => {
    const targetMovie = this.state.findedMovies.find(movie => movie.id === id);
    const filteredFinded = this.state.findedMovies.filter(
      movie => movie.id !== id
    );
    this.props.wantToWatchHandlerRED(targetMovie);
    this.setState((prevState, currState) => {
      return {
        findedMovies: filteredFinded
      };
    });
  };

  userRatingHandler = (note, id) => {
    const ratedMovie = this.state.findedMovies.find(movie => movie.id === id);
    ratedMovie.my_note = note;
    const filteredFinded = this.state.findedMovies.filter(
      movie => movie.id !== id
    );
    this.setState((prevState, nextProps) => {
      return {
        findedMovies: [...filteredFinded]
      };
    });
    this.props.userRatingHandlerRED(ratedMovie);
  };

  render() {
    const { findedMovies } = this.state;

    const moviesListItems = findedMovies.map(movie => {
      const { id, poster_path, original_title, release_date, overview } = movie;

      const noteBackground = { backgroundColor: '' };
      if (movie.vote_average >= 7) {
        noteBackground.backgroundColor = '#288112';
      } else if (movie.vote_average >= 5) {
        noteBackground.backgroundColor = '#d17e11';
      } else if (movie.vote_average > 0) {
        noteBackground.backgroundColor = '#d11111';
      } else {
        noteBackground.backgroundColor = 'rgba(128, 128, 128, 0.5)';
      }

      return (
        <li className="search__list-item" key={id}>
          <img
            className="search__movie-cover"
            src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
          />
          <Rating
            userRatingHandler={e => this.userRatingHandler(e.target.value, id)}
          />
          <div>
            <h3 className="search__movie-title">{original_title}</h3>
            <p className="search__release-year">
              Release Year: {release_date.substring(0, 4)};
            </p>
            <p className="search__movie-overview">
              {overview.split(' ').length > 45
                ? overview
                    .split(' ')
                    .splice(0, 40)
                    .join(' ') + `...`
                : overview}
            </p>
          </div>
          <div className="search__action-buttons">
            <button
              onClick={() => this.wantToWatchHandler(id)}
              className="btn btn--want">
              Want to watch
            </button>
          </div>
        </li>
      );
    });

    return (
      <div className="search">
        <h3 className="search__section-title">Search for Your Movies</h3>
        <input
          className="search__input"
          onChange={this.searchForMoviesHandler}
          type="search"
          placeholder="Search now..."
        />
        <div className="search__list-wrapper">
          <ul className="search__finded-list">{moviesListItems}</ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    watchedRED: state.watched,
    wantToWatchRED: state.wantToWatch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: movieObj =>
      dispatch({ type: 'USER_RATING_FROM_SEARCH', movie: movieObj }),
    wantToWatchHandlerRED: movieObj =>
      dispatch({ type: 'ADD_TO_WANT_FROM_SEARCH', movie: movieObj })
  };
};

export default connect(null, mapDispatchToProps)(Search);
