import * as actionTypes from "./actionTypes";
import { db } from "../assets/firebaseConfig";

export const userRating = (note, id) => ({
  type: actionTypes.USER_RATING,
  note,
  id
});

export const deleteMovie = id => ({ type: actionTypes.DELETE_MOVIE, id });

export const deleteMovieFromWatched = id => ({
  type: actionTypes.DELETE_MOVIE_FROM_WATCHED,
  id
});

export const userRatingFromSearch = movieObj => ({
  type: actionTypes.USER_RATING_FROM_SEARCH,
  movie: movieObj
});

export const addToWantToWatch = movieObj => ({
  type: actionTypes.ADD_TO_WANT_FROM_SEARCH,
  movie: movieObj
});

export const fetchStateFromFirestore = () => async dispatch => {
  db.collection("users")
    .doc("maks")
    .get()
    .then(doc => {
      return dispatch({
        type: actionTypes.FETCH_STATE,
        newState: doc.data().state
      });
    });
};
