import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

toast.configure();

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
