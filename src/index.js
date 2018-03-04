import React from "react";
import ReactDOM from "react-dom";

import Rotas from "./Rotas";

import "./css/normalize.css";
import "./css/pure.css";
import "./css/bootstrap-theme.css";
import "./css/side-bar.css";
import "./css/index.css";
import "./css/login.css";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Rotas />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
