import React, { Component } from "react";
import "./App.css";
// import { getMovie } from './assets/apiConfig'
import Header from "./components/Header/Header";
import MainPage from "./containers/MainPage/MainPage";
import Search from "./components/Search/Search";
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    wantToWatch: [],
    watched: []
  };

  addToWantMoviesHandler = moviesArr => {
    this.setState((prevState, currState) => {
      return { wantToWatch: [...prevState.wantToWatch, ...moviesArr] };
    });
  };

  userRatingHandler = (rating, movieId) => {
    const targetMovie = this.state.wantToWatch.filter(
      movie => movie.id === movieId
    );
    targetMovie[0].my_note = Number(rating);
    const newWantToWatchArr = this.state.wantToWatch.filter(
      movie => movie.id !== movieId
    );

    this.setState((prevState, currState) => {
      return {
        wantToWatch: newWantToWatchArr,
        watched: [...prevState.watched, ...targetMovie]
      };
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Route
              path="/"
              exact
              render={() => (
                <MainPage
                  wantToWatch={this.state.wantToWatch}
                  watched={this.state.watched}
                  favourites={this.state.watched}
                  userRatingHandler={(value, movieId) =>
                    this.userRatingHandler(value, movieId)
                  }
                />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  addMoviesHandler={moviesArr =>
                    this.addToWantMoviesHandler(moviesArr)
                  }
                />
              )}
            />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;