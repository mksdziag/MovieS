import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { userRatingFromSearch, addToToWatch, deleteMovie } from '../../store/actions';
import { movieUrl, trailerUrl } from '../../assets/apiConfig';
import './MoviePage.css';
import Fontawesome from '@fortawesome/react-fontawesome';
import backIcon from '@fortawesome/fontawesome-free-solid/faArrowAltCircleLeft';
import Rating from '../Rating/Rating';
import YoutubeMovie from '../UiElements/Media/YoutubeMovie';
import movieRatingColorize from '../../assets/helpers/movieRatingColorize';
import LoadingSpinner from '../UiElements/LoadingSpinner';
import ChangeNoteModal from '../UiElements/Modals/ChangeNoteModal';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      youtubeSrcSlug: '',
      currentWatched: this.props.watchedMoviesRED,
      currentToWatch: this.props.toWatchMoviesRED,
      isChangeNoteModalActive: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.toWatchMoviesRED !== prevState.currentToWatch) {
      return {
        currentToWatch: nextProps.toWatchMoviesRED,
      };
    }
    return null;
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;
    const targetMovieOnLists = [...this.state.currentToWatch, ...this.state.currentWatched].find(
      movie => movie.id === parseFloat(movieId)
    );

    if (targetMovieOnLists) {
      this.setState({ movie: targetMovieOnLists });
    } else {
      axios
        .get(movieUrl(movieId))
        .then(results => {
          const movie = results.data;
          this.setState({ movie });
        })
        .catch(err => console.log(err));
    }
    axios
      .get(trailerUrl(movieId))
      .then(results => {
        const youtubeSrcSlug = results.data.results[0].key;
        this.setState({ youtubeSrcSlug });
      })
      .catch(err => console.log(err));
  }

  toWatchHandler = e => {
    const { movie } = this.state;
    this.props.toWatchHandlerRED(movie);
    e.target.innerText = 'movie added';
    e.target.setAttribute('disabled', 'true');
  };

  userRatingHandler = (note, id) => {
    const { movie } = this.state;
    movie.my_note = note;
    this.props.userRatingHandlerRED(movie);

    const isAlreadyOnToWatch = this.state.currentToWatch.some(movie => movie.id === id);
    if (isAlreadyOnToWatch) {
      this.props.deleteMovieHandlerRED(id);
    }
  };

  onNoteClickHandler = () => {
    this.setState({ isChangeNoteModalActive: true });
  };
  onModalCloseHandler = () => {
    this.setState({ isChangeNoteModalActive: false });
  };

  render() {
    const { history } = this.props;
    const {
      title,
      overview,
      release_date,
      poster_path,
      id,
      vote_average,
      my_note,
    } = this.state.movie;

    const noteColor = movieRatingColorize(vote_average);

    const statusActions = !my_note && (
      <div className="movie-page__status-actions">
        <Rating userRatingHandler={e => this.userRatingHandler(e.target.value, id)} />
        {!this.state.currentToWatch.some(movie => movie.id === id) && (
          <button onClick={e => this.toWatchHandler(e)} className="btn">
            Want to watch
          </button>
        )}
      </div>
    );

    const myNote = my_note && (
      <div className="movie-page__my-note" onClick={() => this.onNoteClickHandler()}>
        <span className="movie-page__my-note-count">{my_note}</span>
        <span className="movie-page__my-note-desc">my note</span>
      </div>
    );

    const movieTrailer = this.state.youtubeSrcSlug ? (
      <div className="movie-page__trailer-wrapper">
        <YoutubeMovie title={title} youtubeSrcSlug={this.state.youtubeSrcSlug} />
      </div>
    ) : (
      <p className="movie-page__trailer-info">Sorry... We do not have trailer for this movie.</p>
    );

    const moviePageContent = this.state.movie ? (
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
              <div style={noteColor} className="movie-page__rating">
                <span className="movie-page__rating-count">{vote_average}</span>
                <span className="movie-page__rating-desc">average</span>
              </div>
              {myNote}
            </div>
            <div className="movie-page__overview-wrapper">
              <h4 className="movie-page__release-date">Release date: {release_date}</h4>

              <h2 className="movie-page__title">"{title}"</h2>
              <p className="movie-page__overview">{overview}</p>
              <div className="movie-page__actions">
                {statusActions}
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
          {movieTrailer}
        </div>
        <CSSTransition
          in={this.state.isChangeNoteModalActive}
          timeout={300}
          classNames="bounce-fade"
          mountOnEnter
          unmountOnExit
        >
          <ChangeNoteModal onCloseHandler={this.onModalCloseHandler} movieId={id} />
        </CSSTransition>
      </div>
    ) : (
      <LoadingSpinner />
    );

    return moviePageContent;
  }
}

const mapStateToProps = state => {
  return {
    watchedMoviesRED: state.watched,
    toWatchMoviesRED: state.toWatch,
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
)(MoviePage);
