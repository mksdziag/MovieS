import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import movieRatingColorize from "../../../assets/helpers/movieRatingColorize";
import "./Watched.css";
import WatchedItem from "./WatchedItem";
import SectionTitle from "../../UiElements/SectionTitle";
import ShareModal from "../../UiElements/Modals/ShareModal";

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
      const noteColor = movieRatingColorize(vote_average);

      return (
        <WatchedItem
          onShareHandler={this.onShareHandler}
          key={id}
          noteColor={noteColor}
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
    watchedRED: state.watched,
  };
};

export default connect(mapStateToProps)(Watched);
