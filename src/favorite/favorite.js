import React from "react";
import ReactDOM from "react-dom";

import { FavoriteCard } from "./favoriteCard";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { Navigate } from "react-router-dom";

export class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/favoriteproduct`, {
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
  }

  filterEvent(event) {
    this.setState({ filterValue: event.target.value });
    event.preventDefault();
  }

  render() {
    if (this.state !== null) {
      return (
        <div className="catalog-container-vertical">
          <div className="filter-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Поиск"
              onChange={this.filterEvent}
            />
          </div>
          <FavoriteCard
            items={this.state.items}
            filterValue={this.state.filterValue}
          ></FavoriteCard>
        </div>
      );
    } else {
      return "";
    }
  }
}
