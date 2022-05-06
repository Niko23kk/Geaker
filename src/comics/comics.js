import React from "react";
import ReactDOM from "react-dom";

import { ComicsCard } from "./comicsCard";
import "../css/catalog.css";
import { AddCoinCounter } from "../reducer/coinsReducer";
import { canCoinUpdate, updateCoin } from "..";
import { StaticValue } from "../staticValue";

export class Comics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      publisher: [],
      filterValue: "",
      publishValue: "",
      hardCoverValue: "",
    };
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/comics`, {
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
        if (res.status === 404 || res.status === 400 || res.status === 400) {
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
    fetch(`${StaticValue.BaseURL}/api/publisher`, {
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
            publisher: result,
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

  render() {
    if (this.state !== null && this.state.isLoaded) {
      return (
        <div className="catalog-container">
          {canCoinUpdate ? (
            <AddCoinCounter value={4}> </AddCoinCounter>
          ) : (
            <> </>
          )}
          <div className="filter-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Поиск"
              onChange={(e) => {
                this.setState({ filterValue: e.target.value });
              }}
            />
            <div className="select-container">
              <h3> Переплет </h3>
              <select
                className="select-filter"
                onChange={(e) =>
                  this.setState({
                    hardCoverValue:
                      e.target.value === ""
                        ? ""
                        : e.target.value === "Мягкий переплет"
                        ? false
                        : true,
                  })
                }
              >
                <option> </option> <option> Мягкий переплет </option>
                <option> Твердый переплет </option>
              </select>
            </div>
            <div className="select-container">
              <h3> Издательство </h3>
              <select
                className="select-filter"
                onChange={(e) =>
                  this.setState({ publishValue: e.target.value })
                }
              >
                <option> </option>
                {this.state.publisher.map((item) => (
                  <option> {item.name} </option>
                ))}
              </select>
            </div>
          </div>
          <ComicsCard
            items={this.state.items}
            filterValue={this.state.filterValue}
            publishValue={this.state.publishValue}
            hardCoverValue={this.state.hardCoverValue}
          ></ComicsCard>
        </div>
      );
    } else {
      return "";
    }
  }
}
