import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./public/css/normalize.css";
import "./public/css/side-bar.css";
import "./public/css/index.css";
import "./public/css/pure.css";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
