export const apiKey = "5c390ea5f7529cd1cce0e1069df56f5b";
export const baseUrl = "https://api.themoviedb.org/3";
export const searchUrl = searchWord =>
  `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchWord}`;
export const popularUrl = `${baseUrl}/movie/popular?api_key=${apiKey}&sort_by=popularity.desc&region=USA`;
export const movieUrl = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
export const trailerUrl = id => `${baseUrl}/movie/${id}/videos?api_key=${apiKey}`;
