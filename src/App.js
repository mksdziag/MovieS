import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./containers/MainPage/MainPage";
import Search from "./components/Search/Search";
import MoviePage from "./components/MoviePage/MoviePage";
import LogIn from "./components/LogIn/LogIn";
import { fetchStateFromFirestore } from "./store/actions";
import { db } from "./assets/firebaseConfig";

class App extends Component {
  componentDidMount() {
    console.log("cdidmount");
    this.props.fetchStateFromFirestoreRED();
    // async const statefromFirebase = await
  }

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

const mapDispatchToProps = dispatch => {
  return {
    fetchStateFromFirestoreRED: () => dispatch(fetchStateFromFirestore())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
