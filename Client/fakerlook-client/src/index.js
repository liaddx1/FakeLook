import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

import userReducer from './Store/reducer/user';

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const rootReducer = combineReducers({
  users: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
