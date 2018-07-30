import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { userRatingFromSearch, addToToWatch, deleteMovie } from "../../store/actions";
import { searchUrl } from "../../assets/apiConfig";
import movieRatingColorize from "../../assets/helpers/movieRatingColorize";
import "./Search.css";
import SearchItem from "./SearchItem";
import SimpleModal from "../UiElements/Modals/SimpleModal";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findedMovies: [],
      addedThisTime: [],
      ratedThisTime: [],
      currentWatched: this.props.watchedRED,
      currentToWatch: this.props.toWatchRED,
      isModalActive: false,
      alertMessage: "",
    };
  }

  searchForMoviesHandler = e => {
    const searchWord = e.target.value;
    this.getSearchResults(searchWord);
  };

  getSearchResults = searchWord => {
    axios(searchUrl(searchWord))
      .then(response => {
        const searchResults = response.data.results;
        this.setState({ findedMovies: searchResults });
      })
      .catch(err => console.log(err));
  };

  toWatchHandler = id => {
    const isAlreadyRated = this.state.currentWatched.some(movie => movie.id === id);
    const isOnToWatch = this.state.currentToWatch.some(movie => movie.id === id);
    const wasAddedThisTime = this.state.addedThisTime.some(movie => movie.id === id);

    if (isOnToWatch || wasAddedThisTime) {
      this.showModalInfo("This movie is already on Your To Watch list.");
    } else if (isAlreadyRated) {
      this.showModalInfo("You've already watched and rated this movie.");
    } else {
      const targetMovie = this.state.findedMovies.find(movie => movie.id === id);
      this.props.toWatchHandlerRED(targetMovie);
      this.setState(prevState => {
        const filteredFinded = prevState.findedMovies.filter(movie => movie.id !== id);
        return {
          findedMovies: [...filteredFinded],
          addedThisTime: [...prevState.addedThisTime, targetMovie],
        };
      });
    }
  };

  userRatingHandler = (note, id) => {
    const isAlreadyRated = this.state.currentWatched.some(movie => movie.id === id);
    const isOnToWatch = this.state.currentToWatch.some(movie => movie.id === id);
    const wasRatedThisTime = this.state.ratedThisTime.some(movie => movie.id === id);
    const wasAddedThisTime = this.state.addedThisTime.some(movie => movie.id === id);

    if (isAlreadyRated || wasRatedThisTime) {
      this.showModalInfo("You've already rated this movie.");
    } else if (isOnToWatch || wasAddedThisTime) {
      this.props.deleteMovieHandlerRED(id);
      const ratedMovie = this.state.findedMovies.find(movie => movie.id === id);
      ratedMovie.my_note = note;
      this.props.userRatingHandlerRED(ratedMovie);
      this.setState(prevState => {
        const filteredFinded = prevState.findedMovies.filter(movie => movie.id !== id);
        return {
          findedMovies: [...filteredFinded],
          addedThisTime: [...prevState.ratedThisTime, ratedMovie],
        };
      });
    } else {
      const ratedMovie = this.state.findedMovies.find(movie => movie.id === id);
      ratedMovie.my_note = note;
      this.props.userRatingHandlerRED(ratedMovie);
      this.setState(prevState => {
        const filteredFinded = prevState.findedMovies.filter(movie => movie.id !== id);
        return {
          findedMovies: [...filteredFinded],
          ratedThisTime: [...prevState.ratedThisTime, ratedMovie],
        };
      });
    }
  };

  showModalInfo = message => {
    this.setState({
      alertMessage: message,
      isModalActive: true,
    });
    // hiding modal after 2.5s
    setTimeout(() => {
      this.hideModalInfo();
    }, 2500);
  };

  hideModalInfo = () => {
    this.setState({
      isModalActive: false,
      alertMessage: "",
    });
  };

  render() {
    const { findedMovies } = this.state;

    const moviesListItems = findedMovies.map(movie => {
      const { id, vote_average } = movie;
      const noteColor = movieRatingColorize(vote_average);

      return (
        <SearchItem
          key={id}
          {...movie}
          noteColor={noteColor}
          userRatingHandler={(note, id) => this.userRatingHandler(note, id)}
          toWatchHandler={id => this.toWatchHandler(id)}
        />
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
        <CSSTransition
          in={this.state.isModalActive}
          timeout={300}
          classNames="fading"
          mountOnEnter
          unmountOnExit
        >
          <SimpleModal message={this.state.alertMessage} onCloseHandler={this.hideModalInfo} />
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toWatchRED: state.toWatch,
    watchedRED: state.watched,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: movieObj => dispatch(userRatingFromSearch(movieObj)),
    toWatchHandlerRED: movieObj => dispatch(addToToWatch(movieObj)),
    deleteMovieHandlerRED: id => dispatch(deleteMovie(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
