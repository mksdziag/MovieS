import * as actionTypes from './actionTypes';

let initaialState = {
  toWatch: [],
  watched: [],
  user: '',
};

const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WANT_FROM_SEARCH:
      return {
        ...state,
        toWatch: [...state.toWatch, action.movie],
        watched: [...state.watched],
      };
    case actionTypes.USER_RATING:
      const ratedMovie = { ...[...state.toWatch].find(movie => movie.id === action.id) };
      ratedMovie.my_note = action.note;
      return {
        ...state,
        toWatch: [...state.toWatch].filter(movie => movie.id !== action.id),
        watched: [...state.watched, ratedMovie],
      };

    case actionTypes.DELETE_MOVIE:
      return {
        ...state,
        toWatch: [...state.toWatch].filter(movie => movie.id !== action.id),
        watched: [...state.watched],
      };
    case actionTypes.USER_RATING_FROM_SEARCH:
      return {
        ...state,
        toWatch: [...state.toWatch],
        watched: [...state.watched, action.movie],
      };
    case actionTypes.DELETE_MOVIE_FROM_WATCHED:
      return {
        ...state,
        toWatch: [...state.toWatch],
        watched: [...state.watched].filter(movie => movie.id !== action.id),
      };
    case actionTypes.USER_RATING_CHANGE:
      const targetMovie = { ...[...state.watched].find(movie => movie.id === action.id) };
      targetMovie.my_note = action.newNote;
      return {
        ...state,
        toWatch: [...state.toWatch],
        watched: [...state.watched.filter(movie => movie.id !== action.id), targetMovie],
      };
    case actionTypes.FETCH_STATE:
      return action.fetchedState;
    default:
      return state;
  }
};

export default reducer;
