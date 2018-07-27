import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Rating from "../Rating/Rating";
import Fontawesome from "@fortawesome/react-fontawesome";
import backIcon from "@fortawesome/fontawesome-free-solid/faArrowAltCircleLeft";
import SimpleModal from "../UiElements/Modals/SimpleModal";
import { userRatingFromSearch, addToWantToWatch } from "../../store/actions";
import { movieUrl, trailerUrl } from "../../assets/apiConfig";
import movieRatingColorize from "../../assets/movieRatingColorize";

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
      youtubeTrailerSlug: "",
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
    axios
      .get(trailerUrl(movieId))
      .then(results => {
        const youtubeTrailerSlug = results.data.results[0].key;
        this.setState({ youtubeTrailerSlug });
      })
      .catch(err => console.log(err));
  }

  userRatingHandler = () => {};

  render() {
    const { history } = this.props;
    const { title, overview, release_date, poster_path, id, vote_average } = this.state.movie;
    const noteBackground = movieRatingColorize(vote_average);

    const content = this.state.movie ? (
      <div className="movie-page">
        <div className="movie-page__wrapper">
          <div className="movie-page__content">
            <div
              className="movie-page__cover-spot"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
              }}
            >
              <button className="btn movie-page__back" onClick={() => history.goBack()}>
                <Fontawesome icon={backIcon} />
              </button>
              <div style={noteBackground} className="movie-page__rating">
                <span className="movie-page__rating-count">{vote_average}</span>
                <span className="movie-page__rating-desc">average</span>
              </div>
            </div>
            <div className="movie-page__overview-wrapper">
              <h4 className="movie-page__release-date">Release date: {release_date}</h4>

              <h2 className="movie-page__title">"{title}"</h2>
              <p className="movie-page__overview">{overview}</p>
              <div className="movie-page__actions">
                <Rating userRatingHandler={e => this.userRatingHandler(e.target.value, id)} />
                <a
                  href={`https://www.filmweb.pl/search?q=${title}`}
                  target="_blank"
                  className="btn btn--secondary"
                >
                  check on filmweb
                </a>
              </div>
            </div>
          </div>
          {this.state.youtubeTrailerSlug ? (
            <div className="movie-page__trailer-wrapper">
              <iframe
                className="movie-page__trailer-iframe"
                title={title}
                src={`https://www.youtube.com/embed/${this.state.youtubeTrailerSlug}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="movie-page__trailer-info">
              Neistety. Nie znaleźliśmy trailera do tego filmu. Prawdopodobnie w ogóle nie istnieje.
            </p>
          )}
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
