import React from "react";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AdminParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      publisher: [],
      selectedFile: [],
    };
    this.clickParse = this.clickParse.bind(this);
    this.onChangePath = this.onChangePath.bind(this);
    this.clickSave = this.clickSave.bind(this);
  }

  onChangePath(path) {
    this.setState({ path });
  }

  clickParse(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    try {
      if (
        data.get("start") != "" &&
        data.get("end") != "" &&
        data.get("start") <= data.get("end")
      ) {
        fetch(
          `${StaticValue.BaseURL}/api/parse/${data.get("start")}/${data.get(
            "end"
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
          .then((res) => {
            this.setState({
              status: res.status,
            });
            if (res.status != 404) {
              return res.json();
            }
          })
          .then(
            (result) => {
              if (this.state.status === 200) {
                alert("Ok");
                this.setState({ okay: result.message });
              } else if (this.state.status === 400) {
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
    } catch {}
  }

  clickSave(e) {
    e.preventDefault();
    try {
      var data = new FormData(e.target);
      fetch(`${StaticValue.BaseURL}/api/parsersave/${data.get("file")}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
        .then((res) => {
          res.blob().then((blob) => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = data.get("file") + ".txt";
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
    } catch {}
  }

  render() {
    if (localStorage.idRole == 1) {
      return (
        <div>
          <form
            className="form-container add-container add-photo-container"
            onSubmit={this.clickParse}
          >
            <h3 className="admin-form-title"> Первая страница </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Начальная страница"
              name="start"
            />
            <h3 className="admin-form-title"> Последняя страница </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Конечная страница"
              name="end"
            />
            <div className="form-error"> {this.state.error} </div>
            <div className="form-okay"> {this.state.okay} </div>
            <input className="submit-input" type="submit" />
          </form>
          <form
            className="form-container add-container add-photo-container"
            onSubmit={this.clickSave}
          >
            <h3 className="admin-form-title"> Имя файла </h3>
            <select className="select-filter" name="file">
              <option> result </option> <option> format </option>
              <option> comicsphoto </option>
            </select>
            <input className="submit-input" type="submit" value="Сохранить" />
          </form>
        </div>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}
