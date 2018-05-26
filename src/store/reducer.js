const initaialState = {
  wantToWatch: [],
  watched: []
};

const reducer = (state = initaialState, action) => {
  console.log('reducer:', action, 'state:', state);

  switch (action.type) {
    case 'ADD_TO_WANT_FROM_SEARCH':
      return {
        ...state,
        wantToWatch: [...state.wantToWatch, action.movie],
        watched: [...state.watched]
      };
    case 'USER_RATING':
      const ratedMovie = [...state.wantToWatch].find(
        movie => movie.id === action.id
      );
      ratedMovie.my_note = action.note;
      return {
        ...state,
        wantToWatch: [...state.wantToWatch].filter(
          movie => movie.id !== action.id
        ),
        watched: [...state.watched, ratedMovie]
      };

    case 'DELETE_MOVIE':
      return {
        ...state,
        wantToWatch: [...state.wantToWatch].filter(
          movie => movie.id !== action.id
        ),
        watched: [...state.watched]
      };
    case 'USER_RATING_FROM_SEARCH':
      return {
        ...state,
        watched: [...state.watched, action.movie],
        wantToWatch: [...state.wantToWatch]
      };
    default:
      return state;
  }
};

export default reducer;
