// https://api.themoviedb.org/3/movie/550?api_key=5c390ea5f7529cd1cce0e1069df56f5b

const getMovie = keyWord => {
  const apiKey = "5c390ea5f7529cd1cce0e1069df56f5b";
  const baseUrl = "https://api.themoviedb.org/3/";
  const url = `${baseUrl}search/movie?api_key=${apiKey}?uery=${keyWord}`;

  const movieData = axios(url)
    .then(resposne => console.log(respone.data))
    .catch(err => err);
};

export { getMovie };
