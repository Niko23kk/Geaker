import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import "./style.css";
import Buy from "../icons/coin.png";
import { StaticValue } from "../staticValue";

export class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      error: "",
    };
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

  render() {
    return (
      <div className="project-container">
        {this.props.items
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <Link to={`/imageproject/${item.id}`} className="project-card">
              <div className="product-title">
                <span className="product-title-text"> {item.name} </span>
              </div>
              <div className="time-message">
                {item.dateCreated.split("T")[0].split("-").reverse().join("/")}
                <br />
                {item.dateCreated.split("T")[1].split("-").reverse().join("/")}
              </div>
            </Link>
          ))}
        <div className="project-card">
          <div className="product-title">
            <span className="product-title-text"> Создайте новый проект </span>
          </div>
          <input
            type="text"
            className="create-project-name"
            placeholder="Введите название"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <div className="form-error"> {this.state.error} </div>
          <button className="create-project-button" onClick={this.addProject}>
            Создать
          </button>
        </div>
      </div>
    );
  }
}
