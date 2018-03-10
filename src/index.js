import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./public/css/normalize.css";
import "./public/css/side-bar.css";
import "./public/css/index.css";
import "./public/css/pure.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
