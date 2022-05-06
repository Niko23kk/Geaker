import React from "react";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import "../css/form.css";
import { StaticValue } from "../staticValue";
import { canCoinUpdate } from "..";
import Delete from "../icons/delete.png";
import { AddCoinCounter } from "../reducer/coinsReducer";

export class AdminForumThems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      message: "",
      filterValue: "",
    };
    this.addThem = this.addThem.bind(this);
    this.delete = this.delete.bind(this);
  }

  addThem(e) {
    e.preventDefault();
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

  delete(id) {
    fetch(`${StaticValue.BaseURL}/api/forumThem/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        id: parseInt(id),
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
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="forum-message-container">
          {this.state.items.map((them) => (
            <div className="message-like-container">
              <Link
                to={`/adminForumThem/${them.id}`}
                className="container-forum-message"
              >
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
              <div className="mark-container">
                <img
                  src={Delete}
                  className="positive-mark"
                  onClick={() => this.delete(them.id)}
                />
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return "";
    }
  }
}
