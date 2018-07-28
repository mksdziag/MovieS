import React from "react";
import "./ShareModal.css";
import Fontawesome from "@fortawesome/react-fontawesome";
import closeIcon from "@fortawesome/fontawesome-free-solid/faWindowClose";
import { TwitterIcon } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { FacebookIcon } from "@fortawesome/free-brands-svg-icons/faTwitter";

const shareModal = ({ message, onCloseHandler, sharedUrl }) => {
  return (
    <div className="share-modal__backdrop" onClick={onCloseHandler}>
      <div className="share-modal">
        <p className="share-modal__message">Share it!</p>
        <a
          href={`https://twitter.com/share?url=${sharedUrl}`}
          target="_blank"
          className="share-modal__link"
        >
          Share On Twitter
          <Fontawesome icon={TwitterIcon} className="share-modal__social-icon" />
        </a>
        <a
          href={`https://www.facebook.com/sharer.php?s=100&p[url]=${sharedUrl}`}
          target="_blank"
          className="share-modal__link"
        >
          Share On Facebook
          <Fontawesome icon={FacebookIcon} className="share-modal__social-icon" />
        </a>
        <Fontawesome icon={closeIcon} className="share-modal__close" onClick={onCloseHandler} />
      </div>
    </div>
  );
};

export default shareModal;
