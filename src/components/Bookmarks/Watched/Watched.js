import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import movieRatingColorize from '../../../assets/helpers/movieRatingColorize';
import './Watched.css';
import WatchedItem from './WatchedItem';
import SectionTitle from '../../UiElements/SectionTitle';
import ShareModal from '../../UiElements/Modals/ShareModal';

class Watched extends Component {
  state = {
    isModalActive: false,
    sharedMovieId: '',
  };

  onShareHandler = id => {
    this.setState({
      sharedMovieId: id,
      isModalActive: true,
    });
  };

  onModalCloseHandler = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const { watchedRED } = this.props;
    const watchedList = watchedRED.map(movie => {
      const { id, vote_average } = movie;
      const noteColor = movieRatingColorize(vote_average);

      return (
        <CSSTransition key={id} timeout={400} classNames="items-fade">
          <WatchedItem
            onShareHandler={() => this.onShareHandler(id)}
            key={id}
            noteColor={noteColor}
            {...movie}
          />
        </CSSTransition>
      );
    });

    return (
      <section className="section watched__section-wrapper">
        <SectionTitle title="Watched" />
        <TransitionGroup component={'ul'} className="watched__list">
          {watchedList}
        </TransitionGroup>
        <CSSTransition
          in={this.state.isModalActive}
          timeout={300}
          classNames="bounce-fade"
          mountOnEnter
          unmountOnExit
        >
          <ShareModal
            sharedUrl={`${window.location.href}/movie/${this.state.sharedMovieId}`}
            onCloseHandler={this.onModalCloseHandler}
          />
        </CSSTransition>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    watchedRED: state.watched,
  };
};

export default connect(mapStateToProps)(Watched);
