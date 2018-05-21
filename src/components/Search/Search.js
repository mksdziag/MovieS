import React, { Component } from "react";
import axios from "axios";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findedMovies: [],
      wantToWatchToAdd: [],
      watchedToAdd: []
    };
  }

  searchForMoviesHandler = e => {
    const searchedWord = e.target.value;
    this.getMovie(searchedWord);
  };

  getMovie = keyWord => {
    const apiKey = "5c390ea5f7529cd1cce0e1069df56f5b";
    const baseUrl = "https://api.themoviedb.org/3/";
    const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${keyWord}`;

    axios(url)
      .then(response => {
        const moviesArr = response.data.results;
        this.setState((prevState, currState) => {
          return { findedMovies: moviesArr };
        });
      })
      .catch(err => err);
  };

  wantToWatchHandler = id => {
    const targetMovieArr = this.state.findedMovies.filter(
      movie => movie.id === id
    );
    targetMovieArr[0].my_note = "-";
    const filteredFinded = this.state.findedMovies.filter(
      movie => movie.id !== id
    );

    this.setState((prevState, currState) => {
      return {
        wantToWatchToAdd: [...prevState.wantToWatchToAdd, ...targetMovieArr],
        findedMovies: filteredFinded
      };
    });
  };

  render() {
    const moviesListItems = this.state.findedMovies.map(movie => {
      return (
        <li className="search__list-item" key={movie.id}>
          <img
            className="search__movie-cover"
            src={
              movie.poster_path &&
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt=""
          />
          <div>
            <h3 className="search__movie-title">{movie.original_title}</h3>
            <p className="search__movie-year">
              {movie.release_date.substring(0, 4)}
            </p>
            <p className="search__movie-overview">
              {movie.overview.substr(0, 145)}...
            </p>
          </div>
          <div className="search__action-buttons">
            <button
              onClick={() => this.wantToWatchHandler(movie.id)}
              className="btn btn--want"
            >
              Want to watch
            </button>
            <button onClick={this.rateHandler} className="btn btn--rate">
              Rate
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
        <div className="search__accept-add">
          <button
            onClick={() =>
              this.props.addMoviesHandler(this.state.wantToWatchToAdd)
            }
            className="btn btn--accept-add"
          >
            Confirm add
          </button>
          <span className="search__acceped-counter">
            {this.state.wantToWatchToAdd.length}
          </span>
        </div>
        <div className="search__finded-list-wrapper">
          <ul className="search__finded-list">{moviesListItems}</ul>
        </div>
      </div>
    );
  }
}

export default Search;
