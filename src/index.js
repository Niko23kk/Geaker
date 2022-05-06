import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Header } from "./header";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./reducer/coinsReducer";
import { StaticValue } from "./staticValue";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Header />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();

var timer;
var timerStart;
export var timeSpentOnSite = getTimeSpentOnSite();
export var canCoinUpdate = false;

export function updateCoin(coins) {
  fetch(`${StaticValue.BaseURL}/api/playeraccount`, {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token,
    },
    body: JSON.stringify({
      coins: parseInt(coins),
    }),
  });
  canCoinUpdate = false;
  timeSpentOnSite = 0;
  localStorage.setItem("timeSpentOnSite", timeSpentOnSite);
}

function getTimeSpentOnSite() {
  timeSpentOnSite = parseInt(localStorage.getItem("timeSpentOnSite"));
  timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
  return timeSpentOnSite;
}

function startCounting() {
  timerStart = Date.now();
  timer = setInterval(function () {
    timeSpentOnSite = getTimeSpentOnSite() + (Date.now() - timerStart);
    localStorage.setItem("timeSpentOnSite", timeSpentOnSite);
    timerStart = parseInt(Date.now());
    // Convert to seconds
    if (canCoinUpdate == false && timeSpentOnSite / 30000 > 1) {
      canCoinUpdate = true;
      timeSpentOnSite = 0;
    }
  }, 1000);
}
startCounting();

var stopCountingWhenWindowIsInactive = true;

if (stopCountingWhenWindowIsInactive) {
  if (typeof document.hidden !== "undefined") {
    var hidden = "hidden",
      visibilityChange = "visibilitychange",
      visibilityState = "visibilityState";
  } else if (typeof document.msHidden !== "undefined") {
    var hidden = "msHidden",
      visibilityChange = "msvisibilitychange",
      visibilityState = "msVisibilityState";
  }
  var documentIsHidden = document[hidden];

  document.addEventListener(visibilityChange, function () {
    if (documentIsHidden != document[hidden]) {
      if (document[hidden]) {
        // Window is inactive
        clearInterval(timer);
      } else {
        // Window is active
        startCounting();
      }
      documentIsHidden = document[hidden];
    }
  });
}
