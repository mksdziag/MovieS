import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./containers/MainPage/MainPage";
import Search from "./components/Search/Search";
import MoviePage from "./components/MoviePage/MoviePage";
import LogIn from "./components/LogIn/LogIn";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/search" component={Search} />
              <Route path="/auth" component={LogIn} />
              <Route path="/movies/:id" component={MoviePage} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
