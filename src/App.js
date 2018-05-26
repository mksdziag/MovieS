import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import MainPage from './containers/MainPage/MainPage';
import Search from './components/Search/Search';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Route path="/" exact component={MainPage} />
            <Route path="/search" component={Search} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
