import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import tables from "./Table/mock.json";

ReactDOM.render(
  <React.StrictMode>
    <App tables={tables} />
  </React.StrictMode>,
  document.getElementById("root")
);
