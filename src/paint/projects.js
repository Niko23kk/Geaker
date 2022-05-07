import React from "react";
import ReactDOM from "react-dom";

import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { Navigate } from "react-router-dom";
import { AddCoinCounter } from "../reducer/coinsReducer";
import { canCoinUpdate } from "..";
import { ProjectCard } from "./projectCard";
import { Link } from "react-router-dom";

export class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
      name: "",
      error: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
    this.addProject = this.addProject.bind(this);
  }

  addProject(e) {
    if (this.state.name != "") {
      fetch(`${StaticValue.BaseURL}/api/project`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
        body: JSON.stringify({
          name: this.state.name,
        }),
      }).then(
        (res) => {
          if (res.status === 200) {
            this.componentDidMount();
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
          if (res.status === 409) {
            alert("Поднакопите монеток");
          }
          if (res.status === 500) {
            window.location.href = "/internalServerError";
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    } else {
      this.setState({
        error: "Введите имя",
      });
    }
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/project`, {
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
          });
        }
      );
  }

  filterEvent(event) {
    this.setState({ filterValue: event.target.value });
    event.preventDefault();
  }

  render() {
    if (this.state !== null && this.state.isLoaded) {
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
          <div className="project-container">
            {this.state.items
              .filter((item) =>
                item.name
                  .toLowerCase()
                  .includes(this.state.filterValue.toLowerCase())
              )
              .map((item) => (
                <Link to={`/imageproject/${item.id}`} className="project-card">
                  <div className="product-title">
                    <span className="product-title-text"> {item.name} </span>
                  </div>
                  <div className="time-message">
                    {item.dateCreated
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                    <br />
                    {item.dateCreated
                      .split("T")[1]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </div>
                </Link>
              ))}
            <div className="project-card">
              <div className="product-title">
                <span className="product-title-text">
                  Создайте новый проект
                </span>
              </div>
              <input
                type="text"
                className="create-project-name"
                placeholder="Введите название"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <div className="form-error"> {this.state.error} </div>
              <button
                className="create-project-button"
                onClick={this.addProject}
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}
