import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStateFromLocalStorage } from "./store/actions";

import "./App.css";

import AppHeader from "./components/AppHeader/AppHeader";
import MainPage from "./containers/MainPage/MainPage";
import Search from "./components/Search/Search";
import MoviePage from "./components/MoviePage/MoviePage";
import LogIn from "./components/LogIn/LogIn";
import Trending from "./components/Trending/Trending";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppHeader />
          <main>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/search/:id" component={MoviePage} />
              <Route path="/search" component={Search} />
              <Route path="/auth" component={LogIn} />
              <Route path="/trending" component={Trending} />
              <Route path="/movies/:id" component={MoviePage} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStateFromLocalStorageRED: () => dispatch(fetchStateFromLocalStorage()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
