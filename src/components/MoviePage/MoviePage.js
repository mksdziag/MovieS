import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Rating from "../Rating/Rating";
import Fontawesome from "@fortawesome/react-fontawesome";
import backIcon from "@fortawesome/fontawesome-free-solid/faArrowAltCircleLeft";
import SimpleModal from "../UiElements/Modals/SimpleModal";
import { userRatingFromSearch, addToWantToWatch } from "../../store/actions";
import { movieUrl } from "../../assets/apiConfig";

import "./MoviePage.css";
import axios from "axios";

class moviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedThisTime: [],
      ratedThisTime: [],
      currentWatched: this.props.watchedMoviesRED,
      currentWantToWatch: this.props.wantToWatchMoviesRED,
      isModalActive: false,
      alertMessage: "",
      movie: "",
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const movieId = match.params.id;
    const targetMovieOnLists = [
      ...this.state.currentWantToWatch,
      ...this.state.currentWatched,
    ].find(movie => movie.id === parseFloat(movieId));

    if (targetMovieOnLists) {
      this.setState({ movie: targetMovieOnLists });
    } else {
      axios
        .get(movieUrl(movieId))
        .then(results => {
          console.log("wysyłam zapytanie do api");
          const movie = results.data;
          this.setState({ movie });
        })
        .catch(err => console.log(err));
    }
  }

  userRatingHandler = () => {};

  render() {
    const { history } = this.props;
    const { title, overview, release_date, poster_path, id } = this.state.movie;
    const content = this.state.movie ? (
      <div>
        <div className="movie-card">
          <div
            className="movie-card__cover-spot"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
            }}
          >
            <button className="btn movie-card__back" onClick={() => history.goBack()}>
              <Fontawesome icon={backIcon} />
            </button>
          </div>
          <div className="movie-card__overview-wrapper">
            <h4 className="movie-card__release-date">Released: {release_date}</h4>
            <h2 className="movie-card__title">"{title}"</h2>
            <p className="movie-card__overview">{overview}</p>
            <button className="btn btn--secondary">Watch online</button>
            <Rating userRatingHandler={e => this.userRatingHandler(e.target.value, id)} />
          </div>
        </div>
        <CSSTransition
          in={this.state.isModalActive}
          timeout={300}
          classNames="fading"
          mountOnEnter
          unmountOnExit
        >
          <SimpleModal message={this.state.message} onCloseHandler={this.hideAlertInfo} />
        </CSSTransition>
      </div>
    ) : (
      <h1>Loading</h1>
    );

    return content;
  }
}

const mapStateToProps = state => {
  return {
    watchedMoviesRED: state.watched,
    wantToWatchMoviesRED: state.wantToWatch,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userRatingHandlerRED: movieObj => dispatch(userRatingFromSearch(movieObj)),
    wantToWatchHandlerRED: movieObj => dispatch(addToWantToWatch(movieObj)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(moviePage);
