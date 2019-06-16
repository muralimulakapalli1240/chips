import React from "react";
import { render } from "react-dom";
import "./styles.css";
import Main from "./components";
import rootReducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
const store = createStore(rootReducer);
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
