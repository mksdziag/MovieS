import * as actionTypes from "./actionTypes";

let initaialState = {
  wantToWatch: [],
  watched: [],
  user: "",
};

const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WANT_FROM_SEARCH:
      return {
        ...state,
        wantToWatch: [...state.wantToWatch, action.movie],
        watched: [...state.watched],
      };
    case actionTypes.USER_RATING:
      const ratedMovie = [...state.wantToWatch].find(movie => movie.id === action.id);
      ratedMovie.my_note = action.note;

      return {
        ...state,
        wantToWatch: [...state.wantToWatch].filter(movie => movie.id !== action.id),
        watched: [...state.watched, ratedMovie],
      };

    case actionTypes.DELETE_MOVIE:
      return {
        ...state,
        wantToWatch: [...state.wantToWatch].filter(movie => movie.id !== action.id),
        watched: [...state.watched],
      };
    case actionTypes.USER_RATING_FROM_SEARCH:
      return {
        ...state,
        watched: [...state.watched, action.movie],
        wantToWatch: [...state.wantToWatch],
      };
    case actionTypes.DELETE_MOVIE_FROM_WATCHED:
      return {
        ...state,
        watched: [...state.watched].filter(movie => movie.id !== action.id),
        wantToWatch: [...state.wantToWatch],
      };
    case actionTypes.FETCH_STATE:
      return action.fetchedState;
    default:
      return state;
  }
};

export default reducer;
