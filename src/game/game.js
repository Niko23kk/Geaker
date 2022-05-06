import React from "react";
import ReactDOM from "react-dom";

import { GameCard } from "./gameCard";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { Navigate } from "react-router-dom";
import { canCoinUpdate } from "..";
import { AddCoinCounter } from "../reducer/coinsReducer";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      subcategories: [],
      filterValue: "",
      subcategoryValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/game`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          window.location.href = "/notAuthorize";
        }
        if (res.status === 403) {
          window.location.href = "/notAccess";
        }
        if (res.status === 404 || res.status === 400) {
          window.location.href = "/notFound";
        }
        if (res.status === 500) {
          window.location.href = "/internalServerError";
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    fetch(`${StaticValue.BaseURL}/api/subcategory/3`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          window.location.href = "/notAuthorize";
        }
        if (res.status === 403) {
          window.location.href = "/notAccess";
        }
        if (res.status === 404 || res.status === 400) {
          window.location.href = "/notFound";
        }
        if (res.status === 500) {
          window.location.href = "/internalServerError";
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            subcategories: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  filterEvent(event) {
    this.setState({ filterValue: event.target.value });
    event.preventDefault();
  }

  render() {
    if (this.state !== null) {
      return (
        <div className="catalog-container">
          {canCoinUpdate ? <AddCoinCounter value={4}> </AddCoinCounter> : <></>}
          <div className="filter-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Поиск"
              onChange={this.filterEvent}
            />
            <div className="select-container">
              <h3> Тип </h3>
              <select
                className="select-filter"
                onChange={(e) =>
                  this.setState({ subcategoryValue: e.target.value })
                }
              >
                <option> </option>
                {this.state.subcategories.map((item) => (
                  <option> {item.name} </option>
                ))}
              </select>
            </div>
          </div>
          <GameCard
            items={this.state.items}
            filterValue={this.state.filterValue}
            subcategoryValue={this.state.subcategoryValue}
          ></GameCard>
        </div>
      );
    } else {
      return "";
    }
  }
}
