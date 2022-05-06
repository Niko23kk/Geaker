import { combineReducers, createStore } from "redux";
import { connect } from "react-redux";
import React from "react";
import { Comics } from "../comics/comics";
import { useState, useEffect } from "react";
import App from "../App";
import { canCoinUpdate, timeSpentOnSite, updateCoin } from "..";
import { StaticValue } from "../staticValue";

const coinReducer = (state = -1, action) => {
  // function getFromDB() {
  //   if (state == -1) {
  //     fetch(StaticValue.BaseURL + `api/playerAccount`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.token,
  //       },
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((result) => {
  //         console.log(result.coins);
  //         state = result.coins;
  //       });
  //   }
  // }
  if (localStorage.token != null) {
    try {
      var request = new XMLHttpRequest();
      request.open("GET", StaticValue.BaseURL + `/api/playerAccount`, false);
      request.setRequestHeader("Authorization", "Bearer " + localStorage.token);
      request.send(null);
    } catch {}

    if (request.status === 200) {
      let curCoins = JSON.parse(request.responseText);
      if (curCoins != null) {
        state = curCoins.coins;
      }
    } else {
      return;
    }
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "SETCOUNTER":
        return state + action.value;
      default:
        return state;
    }
  }
};

// let reducer = combineReducers({
//   coins: coinReducer,
// });

export function setCounter(value) {
  return {
    type: "SETCOUNTER",
    value,
  };
}

// const incrementCount = () => {
//   return {
//     type: "INCREMENT",
//   };
// };

// const decrementCount = () => {
//   return {
//     type: "DECREMENT",
//   };
// };

export const store = createStore(coinReducer);

export const mapStateToProps = (state) => {
  return {
    coins: state,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setCounter,
  };
};

export function Coins(props) {
  return (
    <React.Fragment>
      <div> Count: {props.coins} </div>
    </React.Fragment>
  );
}

export function AddCoin(props) {
  useEffect(() => {
    props.setCounter(props.value);
    updateCoin(props.value);
  });
  return <> </>;
}

export const CoinsView = connect(mapStateToProps)(Coins);

export const AddCoinCounter = connect(null, mapDispatchToProps())(AddCoin);
