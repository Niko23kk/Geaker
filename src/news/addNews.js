import React from "react";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { canCoinUpdate } from "..";
import { AddCoinCounter } from "../reducer/coinsReducer";

export class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      okay: "",
      errormain: "",
      okaymain: "",
      publisher: [],
      selectedFile: "",
      loadedFile: "",
    };
    this.clickAdd = this.clickAdd.bind(this);
    this.clickAddPhoto = this.clickAddPhoto.bind(this);
  }

  clickAdd(e) {
    e.preventDefault();

    canCoinUpdate ? <AddCoinCounter value={25}> </AddCoinCounter> : <></>;

    var data = new FormData(e.target);
    if (
      data.get("name") != null &&
      data.get("photo") != null &&
      data.get("description") != null &&
      data.get("articleText") != null
    ) {
      fetch(`${StaticValue.BaseURL}/api/news`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
        body: JSON.stringify({
          name: data.get("name"),
          photo: "/Photos/" + data.get("photo"),
          description: data.get("description"),
          articleText: data.get("articleText"),
          hidden: data.get("hidden") === "on" ? true : false,
        }),
      })
        .then((res) => {
          this.setState({
            status: res.status,
          });
          if (res.status === 400) {
            return res.json();
          }
        })
        .then(
          (result) => {
            if (this.state.status === 200) {
              alert("Ok");
              this.setState({ okaymain: "Отправлено" });
            } else if (this.state.status === 400) {
              this.setState({ errormain: result.message });
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
      this.setState({ errormain: "Заполните все поля" });
    }
  }

  clickAddPhoto(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("uploadedFile", this.state.selectedFile);
    fetch(`${StaticValue.BaseURL}/api/addPhoto`, {
      method: "Post",
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
      body: data,
    })
      .then((res) => {
        this.setState({
          status: res.status,
        });
        return res.json();
      })
      .then(
        (result) => {
          if (this.state.status === 200) {
            alert("Ok");
            this.setState({
              okay: result.message,
              loadedFile: result.message,
            });
          } else if (this.state.status === 400) {
            this.setState({ error: result.message });
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
  }

  render() {
    return (
      <div>
        <form
          className="form-container add-container"
          onSubmit={this.clickAddPhoto}
        >
          <div class="file-input">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) =>
                this.setState({ selectedFile: e.target.files[0] })
              }
            />{" "}
          </div>{" "}
          <div className="form-error"> {this.state.error} </div>{" "}
          <div className="form-okay"> {this.state.okay} </div>{" "}
          <input className="submit-input" type="submit" />
        </form>{" "}
        <form
          className="form-container add-photo-container"
          onSubmit={this.clickAdd}
        >
          <h3 className="admin-form-title"> Название </h3>{" "}
          <input
            className="field-input"
            type="text"
            placeholder="Название"
            name="name"
          />
          <h3 className="admin-form-title"> Фото </h3>{" "}
          <input
            className="field-input"
            type="text"
            defaultValue={this.state.loadedFile}
            placeholder="Фото"
            name="photo"
            readOnly
          />
          <h3 className="admin-form-title"> Описание </h3>{" "}
          <textarea
            className="field-input input-comment"
            type="text"
            placeholder="Описание"
            name="description"
          />
          <h3 className="admin-form-title"> Текст статьи </h3>{" "}
          <textarea
            className="field-input input-comment"
            type="text"
            placeholder="Текст статьи"
            name="articleText"
          />
          <div className="form-error"> {this.state.errormain} </div>{" "}
          <div className="form-okay"> {this.state.okaymain} </div>{" "}
          <input className="submit-input" type="submit" />
        </form>{" "}
      </div>
    );
  }
}
