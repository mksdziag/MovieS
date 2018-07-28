import React, { Component } from "react";
import "./Watched.css";
import { connect } from "react-redux";
import WatchedItem from "./WatchedItem";
import movieRatingColorize from "../../../assets/movieRatingColorize";
import { withRouter } from "react-router-dom";
import SectionTitle from "../../UiElements/SectionTitle";
import ShareModal from "../../UiElements/Modals/ShareModal";
import { CSSTransition } from "react-transition-group";

class Watched extends Component {
  state = {
    isModalActive: false,
  };

  onShareHandler = () => {
    this.setState({ isModalActive: true });
  };

  onModalCloseHandler = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const { watchedRED } = this.props;
    const watchedList = watchedRED.map(movie => {
      const { id, vote_average } = movie;
      const noteBackground = movieRatingColorize(vote_average);

      return (
        <WatchedItem
          onShareHandler={this.onShareHandler}
          key={id}
          noteBackground={noteBackground}
          {...movie}
        />
      );
    });

    return (
      <section className="section watched__section-wrapper">
        <SectionTitle title="Watched" />
        <ul className="watched__list">{watchedList}</ul>
        <CSSTransition
          in={this.state.isModalActive}
          timeout={300}
          classNames="bounce-fade"
          mountOnEnter
          unmountOnExit
        >
          <ShareModal sharedUrl={window.location.href} onCloseHandler={this.onModalCloseHandler} />
        </CSSTransition>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched,
  };
};

export default withRouter(connect(mapStateToProps)(Watched));
