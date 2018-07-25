import React from "react";
import "./SimpleModal.css";
import Fontawesome from "@fortawesome/react-fontawesome";
import closeIcon from "@fortawesome/fontawesome-free-solid/faWindowClose";

const SimpleModal = ({ message, onCloseHandler }) => {
  return (
    <div className="simple-modal__backdrop" onClick={onCloseHandler}>
      <div className="simple-modal">
        <p className="simple-modal__message">{message}</p>
        <Fontawesome icon={closeIcon} className="simple-modal__close" onClick={onCloseHandler} />
      </div>
    </div>
  );
};

export default SimpleModal;
