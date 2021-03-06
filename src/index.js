import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import { saveStateToLocal, loadStateFromLocal } from './store/loadStorage';
import reducer from './store/reducer';

import App from './App';

// redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// fetching state from local storage
const persistedState = loadStateFromLocal();

// create store from reducer, localStorageState applying redux thunk and dev tolls for redux
const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(reduxThunk)));

// subscribe for changes in state to save every in ls
store.subscribe(() => {
  saveStateToLocal(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
