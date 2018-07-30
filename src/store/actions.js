import * as actionTypes from "./actionTypes";

export const userRating = (note, id) => ({
  type: actionTypes.USER_RATING,
  note,
  id,
});

export const deleteMovie = id => ({ type: actionTypes.DELETE_MOVIE, id });

export const deleteMovieFromWatched = id => ({
  type: actionTypes.DELETE_MOVIE_FROM_WATCHED,
  id,
});

export const userRatingFromSearch = movieObj => ({
  type: actionTypes.USER_RATING_FROM_SEARCH,
  movie: movieObj,
});

export const addToToWatch = movieObj => ({
  type: actionTypes.ADD_TO_WANT_FROM_SEARCH,
  movie: movieObj,
});

export const userRatingChange = (id, note) => ({
  type: actionTypes.USER_RATING_CHANGE,
  id,
  newNote: note,
});

export const fetchStateFromFirestore = () => {
  const fetchedState = JSON.parse(localStorage.getItem("state"));
  return {
    type: actionTypes.FETCH_STATE,
    fetchedState,
  };
};
