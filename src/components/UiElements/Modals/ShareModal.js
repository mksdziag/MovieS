import React from "react";
import "./ShareModal.css";
import Fontawesome from "@fortawesome/react-fontawesome";
import closeIcon from "@fortawesome/fontawesome-free-solid/faWindowClose";
import { Icon } from "react-icons-kit";
import { twitter } from "react-icons-kit/icomoon/twitter";
import { facebook } from "react-icons-kit/icomoon/facebook";

const shareModal = ({ message, onCloseHandler, sharedUrl }) => {
  return (
    <div className="share-modal__backdrop" onClick={onCloseHandler}>
      <div className="share-modal">
        <p className="share-modal__message">Share it!</p>
        <a
          href={`https://twitter.com/share?url=${sharedUrl}`}
          target="_blank"
          className="share-modal__link btn"
        >
          <Icon icon={twitter} className="share-modal__social-icon" />
          Share On Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer.php?s=100&p[url]=${sharedUrl}`}
          target="_blank"
          className="share-modal__link btn"
        >
          <Icon icon={facebook} className="share-modal__social-icon" />
          Share On Facebook
        </a>
        <Fontawesome icon={closeIcon} className="share-modal__close" onClick={onCloseHandler} />
      </div>
    </div>
  );
};

export default shareModal;
