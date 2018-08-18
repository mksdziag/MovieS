import React from 'react';

import './YoutubeMovie.css';

const youtubeMovie = ({ title = 'youtube movie', youtubeSrcSlug }) => {
  return (
    <iframe
      className="youtube-iframe"
      title={title}
      src={`https://www.youtube.com/embed/${youtubeSrcSlug}`}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
};

export default youtubeMovie;
