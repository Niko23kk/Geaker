import React from "react";
import ReactDOM from "react-dom";

import { NewsCard } from "./newsCard";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { Navigate } from "react-router-dom";
import { canCoinUpdate } from "..";
import { AddCoinCounter } from "../reducer/coinsReducer";

export class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/news`, {
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

  static renderNews(news, filterValue) {
    return (
      <div className="product-container">
        {news
          .filter((comic) =>
            comic.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((item) => (
            <div className="product-item" onClick={this.clickNews}>
              <div className="product-img">
                {item.photo.includes("http") ? (
                  <img src={item.photo} alt="description of image" />
                ) : (
                  <img
                    src={StaticValue.BaseURL + item.photo}
                    alt="description of image"
                  />
                )}
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
        <div className="catalog-container-vertical">
          {canCoinUpdate ? <AddCoinCounter value={4}> </AddCoinCounter> : <></>}
          <div className="filter-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Поиск"
              onChange={this.filterEvent}
            />
          </div>
          <NewsCard
            items={this.state.items}
            filterValue={this.state.filterValue}
          ></NewsCard>
        </div>
      );
    } else {
      return "";
    }
  }
}
