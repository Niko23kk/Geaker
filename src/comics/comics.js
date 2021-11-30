import React from "react";
import ReactDOM from "react-dom";

import { ComicsCard } from "./comicsCard";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { Navigate } from "react-router-dom";

export class Comics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch("api/comics", {
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
        if (res.status === 404) {
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

  static renderComics(comics, filterValue) {
    return (
      <div className="product-container">
        {comics
          .filter((comic) =>
            comic.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((item) => (
            <div className="product-item" onClick={this.clickComics}>
              <div className="comics-img">
                <img src={item.photo} alt="description of image" />
              </div>
              <div className="product-title">
                <span className="product-title-text"> {item.name} </span>
              </div>
            </div>
          ))}
      </div>
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
          <input
            type="text"
            className="filter-input"
            placeholder="Поиск"
            onChange={this.filterEvent}
          />
          <ComicsCard
            items={this.state.items}
            filterValue={this.state.filterValue}
          ></ComicsCard>
        </div>
      );
    } else {
      return "";
    }
  }
}
