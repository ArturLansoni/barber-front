import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
