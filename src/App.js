import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./containers/MainPage/MainPage";
import Search from "./components/Search/Search";
import MoviePage from "./components/MoviePage/MoviePage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/search" component={Search} />
              <Route path="/movies/:id" component={MoviePage} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
