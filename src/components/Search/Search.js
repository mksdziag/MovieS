import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { userRatingFromSearch, addToWantToWatch, deleteMovie } from "../../store/actions";
import { searchUrl } from "../../assets/apiConfig";

import "./Search.css";

import movieRatingColorize from "../../assets/movieRatingColorize";
import SearchItem from "./SearchItem";
import SimpleModal from "../UiElements/Modals/SimpleModal";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findedMovies: [],
      currentWatched: this.props.watchedRED,
      currentWantToWatch: this.props.wantToWatchRED,
      alertMessage: "",
      isModalActive: false,
    };
  }

  searchForMoviesHandler = e => {
    const searchWord = e.target.value;
    this.getMovies(searchWord);
  };

  getMovies = searchWord => {
    axios(searchUrl(searchWord))
      .then(response => {
        const searchResults = response.data.results;
        this.setState({ findedMovies: searchResults });
      })
      .catch(err => console.log(err));
  };

  wantToWatchHandler = id => {
    const isAlreadyRated = this.state.currentWatched.find(movie => movie.id === id);
    const isOnWantToWatch = this.state.currentWantToWatch.find(movie => movie.id === id);

    if (isOnWantToWatch) {
      this.showAlertInfo("Ten film jest już na Twojej liście do obejrzenia");
    } else if (isAlreadyRated) {
      this.showAlertInfo("Już obejrzałes i oceniłeś ten film.");
    } else {
      const targetMovie = this.state.findedMovies.find(movie => movie.id === id);
      this.props.wantToWatchHandlerRED(targetMovie);
      this.setState(prevState => {
        const filteredFinded = prevState.findedMovies.filter(movie => movie.id !== id);
        return {
          findedMovies: [...filteredFinded],
        };
      });
    }
  };

  userRatingHandler = (note, id) => {
    const isAlreadyRated = this.state.currentWatched.find(movie => movie.id === id);
    const isOnWantToWatch = this.state.currentWantToWatch.find(movie => movie.id === id);
    if (isAlreadyRated) {
      this.showAlertInfo("Już oceniłeś ten film.");
    } else if (isOnWantToWatch) {
      this.props.deleteMovieHandlerRED(id);
      // ocen film
      const ratedMovie = this.state.findedMovies.find(movie => movie.id === id);
      ratedMovie.my_note = note;
      this.props.userRatingHandlerRED(ratedMovie);
      this.setState(prevState => {
        const filteredFinded = prevState.findedMovies.filter(movie => movie.id !== id);
        return {
          findedMovies: [...filteredFinded],
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
        };
      });
    }
  };

  showAlertInfo = message => {
    this.setState({
      alertMessage: message,
      isModalActive: true,
    });
    // hiding modal after 2.5s
    setTimeout(() => {
      this.hideAlertInfo();
    }, 2500);
  };

  hideAlertInfo = () => {
    this.setState({
      isModalActive: false,
      alertMessage: "",
    });
  };

  render() {
    const { findedMovies } = this.state;

    const moviesListItems = findedMovies.map(movie => {
      const { id, vote_average } = movie;
      const noteBackground = movieRatingColorize(vote_average);

      return (
        <SearchItem
          key={id}
          {...movie}
          noteBackground={noteBackground}
          userRatingHandler={(note, id) => this.userRatingHandler(note, id)}
          wantToWatchHandler={id => this.wantToWatchHandler(id)}
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
          <SimpleModal message={this.state.alertMessage} onCloseHandler={this.hideAlertInfo} />
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: movieObj => dispatch(userRatingFromSearch(movieObj)),
    wantToWatchHandlerRED: movieObj => dispatch(addToWantToWatch(movieObj)),
    deleteMovieHandlerRED: id => dispatch(deleteMovie(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
