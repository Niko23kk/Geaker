import React from "react";
import ReactDOM from "react-dom";

import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { Link, Navigate, useParams } from "react-router-dom";
import { AddCoinCounter } from "../reducer/coinsReducer";
import { canCoinUpdate } from "..";
import { ProjectCard } from "./projectCard";

export function ImageProjectGetParams() {
  let { id } = useParams();

  return <ImageProject id={id} />;
}

export class ImageProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.getGiff = this.getGiff.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/imageproject/${this.props.id}`, {
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

  getGiff(e) {
    fetch(`${StaticValue.BaseURL}/api/giff/${this.props.id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        res.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = `project${this.props.id}.gif`;
          a.click();
        });
        this.setState({
          status: res.status,
        });
      })
      .then(
        (result) => {
          if (this.state.status === 200) {
            alert("Ok");
          } else if (this.state.status === 400) {
            this.setState({ error: "Ошибка при генерации gif" });
          }
          if (this.state.status === 401) {
            window.location.href = "/notAuthorize";
          }
          if (this.state.status === 403) {
            window.location.href = "/notAccess";
          }
          if (this.state.status === 404) {
            window.location.href = "/notFound";
          }
          if (this.state.status === 500) {
            this.setState({ error: "Ошибка при генерации gif" });
          }
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
        <div className="project-container">
          {this.state.items.map((imageProj) => (
            <div className="project-card">
              <div className="project-image">
                {imageProj.photo.includes("http") ? (
                  <img src={imageProj.photo} alt="description of image" />
                ) : (
                  <img
                    src={StaticValue.BaseURL + imageProj.photo}
                    alt="description of image"
                  />
                )}
              </div>
              <div> Номер картинки: {imageProj.orderInProject} </div>
            </div>
          ))}
          <div className="project-card">
            <div className="product-title">
              <span className="product-title-text">
                Создайте новое изображение
              </span>
            </div>
            <Link
              to={`/paint/${this.props.id}`}
              className="create-project-button"
            >
              Создать
            </Link>
          </div>
          <div className="project-card">
            <div className="product-title">
              <span className="product-title-text"> Создать gif </span>
            </div>
            <div className="form-error"> {this.state.error} </div>
            <div onClick={this.getGiff} className="create-project-button">
              Создать
            </div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}
