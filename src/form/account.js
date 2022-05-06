import React from "react";
import "../css/form.css";
import { StaticValue } from "../staticValue";

export class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      okay: "",
      items: [],
      isLoaded: false,
      updateItem: [],
    };
    this.clickUpdate = this.clickUpdate.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/user`, {
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

  clickUpdate(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}/api/user`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        login: data.get("login"),
        name: data.get("name"),
        lastName: data.get("lastName"),
        email: data.get("email"),
      }),
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
            this.setState({ okay: "Okay" });
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
    if (this.state.isLoaded !== null) {
      return (
        <div className="account-container">
          {Array.isArray(this.state.items) ? (
            this.state.items.map((item) => (
              <form
                className="form-container account-form-container"
                onSubmit={this.clickUpdate}
              >
                <h3 className="form-title">Имя</h3>
                <input
                  readOnly
                  className="field-input"
                  name="name"
                  defaultValue={item.name}
                />
                <h3 className="form-title">Фамилия</h3>
                <input
                  readOnly
                  className="field-input"
                  name="lastName"
                  defaultValue={item.lastName}
                />
                <h3 className="form-title">Почта</h3>
                <input
                  readOnly
                  className="field-input"
                  name="email"
                  defaultValue={item.email}
                />
                <h3 className="form-title">Логин</h3>
                <input
                  readOnly
                  className="field-input"
                  name="login"
                  defaultValue={item.login}
                />
              </form>
            ))
          ) : (
            <form className="form-container" onSubmit={this.clickUpdate}>
              <h3 className="form-title">Имя</h3>
              <input
                className="field-input"
                defaultValue={this.state.items.name}
                name="name"
              />

              <h3 className="form-title">Фамилия</h3>
              <input
                className="field-input"
                defaultValue={this.state.items.lastName}
                name="lastName"
              />
              <h3 className="form-title">Почта</h3>
              <input
                className="field-input"
                defaultValue={this.state.items.email}
                name="email"
              />
              <h3 className="form-title">Логин</h3>
              <input
                className="field-input"
                defaultValue={this.state.items.login}
                name="login"
              />
              <div className="form-error"> {this.state.error} </div>
              <div className="form-okay"> {this.state.okay} </div>
              <input className="submit-input" type="submit" />
            </form>
          )}
        </div>
      );
    } else {
      return "";
    }
  }
}
