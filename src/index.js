import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Header } from "./header";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
