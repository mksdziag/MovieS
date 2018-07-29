const movieRatingColorize = vote_average => {
  const noteBackground = { color: "" };
  if (vote_average >= 7) {
    noteBackground.color = "#288112";
  } else if (vote_average >= 5) {
    noteBackground.color = "#d17e11";
  } else if (vote_average > 0) {
    noteBackground.color = "#d11111";
  } else {
    noteBackground.color = "rgba(128, 128, 128, 0.5)";
  }

  return noteBackground;
};

export default movieRatingColorize;
