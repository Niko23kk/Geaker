import React from "react";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      okay: "",
      publisher: [],
      selectedFile: "",
      loadedFile: "",
    };
    this.clickAdd = this.clickAdd.bind(this);
    this.clickAddPhoto = this.clickAddPhoto.bind(this);
  }

  clickAdd(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}api/news`, {
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

  clickAddPhoto(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("uploadedFile", this.state.selectedFile);
    fetch(`${StaticValue.BaseURL}api/addPhoto`, {
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
            />
          </div>
          <div className="form-error"> {this.state.error} </div>
          <div className="form-okay"> {this.state.okay} </div>
          <input className="submit-input" type="submit" />
        </form>
        <form
          className="form-container add-photo-container"
          onSubmit={this.clickAdd}
        >
          <h3 className="admin-form-title"> Name </h3>
          <input
            className="field-input"
            type="text"
            placeholder="Name"
            name="name"
          />
          <h3 className="admin-form-title"> Photo </h3>
          <input
            className="field-input"
            type="text"
            defaultValue={this.state.loadedFile}
            placeholder="Photo"
            name="photo"
          />
          <h3 className="admin-form-title"> Description </h3>
          <textarea
            className="field-input input-comment"
            type="text"
            placeholder="Description"
            name="description"
          />
          <h3 className="admin-form-title"> Article text </h3>
          <textarea
            className="field-input input-comment"
            type="text"
            placeholder="Article text"
            name="articleText"
          />
          <div className="form-error"> {this.state.error} </div>
          <input className="submit-input" type="submit" />
        </form>
      </div>
    );
  }
}
