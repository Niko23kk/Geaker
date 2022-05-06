import React from "react";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import "../css/form.css";
import { StaticValue } from "../staticValue";
import { canCoinUpdate, updateCoin } from "..";
import { AddCoinCounter } from "../reducer/coinsReducer";

export class ForumThems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      message: "",
      filterValue: "",
    };
    this.addThem = this.addThem.bind(this);
  }

  addThem(e) {
    e.preventDefault();
    if (canCoinUpdate) {
      updateCoin(5);
    }
    if (this.state.message != "") {
      fetch(`${StaticValue.BaseURL}/api/forumThem`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
        body: JSON.stringify({
          message: this.state.message,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.componentDidMount();
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/forumThem`, {
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
            items: result,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="forum-them-container">
          <form className="form-container" onSubmit={this.addThem}>
            <textarea
              className="field-input input-comment"
              type="text"
              placeholder="Тема"
              name="comment"
              onChange={(e) => this.setState({ message: e.target.value })}
            />
            <input className="submit-input" type="submit" />
          </form>
          <div className="filter-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Поиск"
              onChange={(e) => this.setState({ filterValue: e.target.value })}
            />
          </div>
          {this.state.items
            .filter((them) =>
              them.message
                .toLowerCase()
                .includes(this.state.filterValue.toLowerCase())
            )
            .map((them) => (
              <Link to={`/forumThem/${them.id}`} className="product-item">
                <div className="header-forum-them">
                  <div className="user-comment"> {them.login} </div>
                  <div className="time-message">
                    {them.dateCreated
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                    <br />
                    {them.dateCreated
                      .split("T")[1]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </div>
                </div>
                <div className="text-comment"> {them.message} </div>
              </Link>
            ))}
        </div>
      );
    } else {
      return "";
    }
  }
}
