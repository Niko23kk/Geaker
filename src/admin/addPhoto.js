import React from "react";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      okay: "",
      publisher: [],
      selectedFile: [],
    };
    this.clickAdd = this.clickAdd.bind(this);
    this.onChangePath = this.onChangePath.bind(this);
  }

  onChangePath(path) {
    this.setState({ path });
  }

  clickAdd(e) {
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
            this.setState({ okay: result.message });
            this.onChangePath(result.message);
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
    if (localStorage.idRole == 1) {
      return (
        <form
          className="form-container add-container add-photo-container"
          onSubmit={this.clickAdd}
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
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}
