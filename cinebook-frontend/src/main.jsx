import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
//bootstrap javascript
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/global.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);