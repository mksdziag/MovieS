const initaialState = {
  wantToWatch: [],
  watched: []
};

const reducer = (state = initaialState, action) => {
  console.log('reducer:', action);
  switch (action.type) {
    case 'ADD_TO_WANT_TO_WATCH':
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
    default:
      return state;
  }
};

export default reducer;
