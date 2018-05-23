import React, { Component } from "react";
import axios from "axios";
import "./Search.css";
import Rating from "../Rating/Rating";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findedMovies: [],
      wantToWatchToAdd: [],
      watchedToAdd: [],
      ratedMovie: null
    };
  }

  userRatingHandler(rating, id) {
    const ratedMovie = this.state.findedMovies.find(movie => movie.id === id);
    ratedMovie.my_note = Number(rating);
    console.log(ratedMovie);
    const filteredFinded = this.state.findedMovies.filter(
      movie => movie.id !== id
    );
    this.setState((prevState, nextProps) => {
      return {
        wantToWatchToAdd: [...prevState.wantToWatchToAdd, ratedMovie],
        findedMovies: filteredFinded
      };
    });
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

  addToWatchedHandler = () => {
    this.props.addMoviesHandler(this.state.wantToWatchToAdd);
    this.setState((prevState, currState) => {
      return { wantToWatchToAdd: [] };
    });
  };

  render() {
    const { findedMovies, wantToWatchToAdd } = this.state;

    const moviesListItems = findedMovies.map(movie => {
      const { id, poster_path, original_title, release_date, overview } = movie;

      const noteBackground = { backgroundColor: "" };
      if (movie.vote_average >= 7) {
        noteBackground.backgroundColor = "#288112";
      } else if (movie.vote_average >= 5) {
        noteBackground.backgroundColor = "#d17e11";
      } else if (movie.vote_average > 0) {
        noteBackground.backgroundColor = "#d11111";
      } else {
        noteBackground.backgroundColor = "rgba(128, 128, 128, 0.5)";
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
              {overview.split(" ").length > 45
                ? overview
                    .split(" ")
                    .splice(0, 40)
                    .join(" ") + `...`
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
        <div className="search__add-wrapper">
          <button
            style={
              wantToWatchToAdd.length > 0
                ? { backgroundColor: "#a20021" }
                : { backgroundColor: "initial" }
            }
            onClick={this.addToWatchedHandler}
            className="btn btn--accept-add">
            Confirm add
            <span className="search__acceped-counter">
              ({wantToWatchToAdd.length})
            </span>
          </button>
        </div>
        <div className="search__list-wrapper">
          <ul className="search__finded-list">{moviesListItems}</ul>
        </div>
      </div>
    );
  }
}

export default Search;
