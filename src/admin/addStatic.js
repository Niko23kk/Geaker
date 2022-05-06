import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AddStatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      publisher: [],
      categories: [],
    };
    this.clickSubcategory = this.clickSubcategory.bind(this);
    this.clickPublisher = this.clickPublisher.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/category`, {
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
            categories: result,
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

  clickSubcategory(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}/api/subcategory`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        name: data.get("subcategory"),
        idCategory: parseInt(data.get("category")),
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
            this.setState({ okaysub: "Отправлено", errorsub: "" });
            alert("Ok");
          } else if (this.state.status === 400) {
            this.setState({ okaysub: result.message });
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

  clickPublisher(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}/api/publisher`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        name: data.get("publisher"),
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
            this.setState({ okaypub: "Отправлено", errorpub: "" });
            alert("Ok");
          } else if (this.state.status === 400) {
            this.setState({ okaypub: result.message });
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
        <div>
          <form className="form-container" onSubmit={this.clickSubcategory}>
            <h3 className="admin-form-title"> Категория </h3>
            <select className="select-filter" name="category">
              {this.state.categories.map((item) => (
                <option value={item.id}> {item.name} </option>
              ))}
            </select>
            <h3 className="admin-form-title"> Подкатегория </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Подкатегория"
              name="subcategory"
            />
            <div className="form-error"> {this.state.errorsub} </div>
            <div className="form-okay"> {this.state.okaysub} </div>
            <input className="submit-input" type="submit" />
          </form>
          <form className="form-container" onSubmit={this.clickPublisher}>
            <h3 className="admin-form-title"> Издатель </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Издатель"
              name="publisher"
            />
            <div className="form-error"> {this.state.errorpub} </div>
            <div className="form-okay"> {this.state.okaypub} </div>
            <input className="submit-input" type="submit" />
          </form>
        </div>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}
