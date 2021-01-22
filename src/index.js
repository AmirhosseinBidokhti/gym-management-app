import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import App from "./app/App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { Provider } from "react-redux";
import store from "./app/redux/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
