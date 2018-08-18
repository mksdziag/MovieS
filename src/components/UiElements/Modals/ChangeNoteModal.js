import React from 'react';
import { connect } from 'react-redux';
import Fontawesome from '@fortawesome/react-fontawesome';
import closeIcon from '@fortawesome/fontawesome-free-solid/faWindowClose';

import './ChangeNoteModal.css';
import { userRatingChange } from '../../../store/actions';

const changeNoteModal = ({ onCloseHandler, movieId, userRatingChangeHandlerRED }) => {
  const userRatingChangeHandler = e => {
    const newRate = e.target.value;
    userRatingChangeHandlerRED(movieId, newRate);
    onCloseHandler();
  };

  return (
    <div className="change-note-modal__backdrop" onClick={onCloseHandler}>
      <div className="change-note-modal" onClick={e => e.stopPropagation()}>
        <p className="change-note-modal__message">Change note for this movie:</p>
        <select onChange={e => userRatingChangeHandler(e)} className="btn btn--select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        <Fontawesome
          icon={closeIcon}
          className="change-note-modal__close"
          onClick={onCloseHandler}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    userRatingChangeHandlerRED: (id, note) => dispatch(userRatingChange(id, note)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(changeNoteModal);
