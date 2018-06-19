const movieRatingColorize = vote_average => {
  const noteBackground = { backgroundColor: "" };
  if (vote_average >= 7) {
    noteBackground.backgroundColor = "#288112";
  } else if (vote_average >= 5) {
    noteBackground.backgroundColor = "#d17e11";
  } else if (vote_average > 0) {
    noteBackground.backgroundColor = "#d11111";
  } else {
    noteBackground.backgroundColor = "rgba(128, 128, 128, 0.5)";
  }

  return noteBackground;
};

export default movieRatingColorize;
