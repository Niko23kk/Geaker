import React from "react";
import "../css/form.css";
import { StaticValue } from "../staticValue";

export class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      updateItem: [],
    };
    this.clickUpdate = this.clickUpdate.bind(this);
  }

  componentDidMount() {
    fetch("api/user", {
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
        if (res.status === 404) {
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
          console.log(result);
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
    fetch(StaticValue.BaseURL + "api/user", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {},
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
      console.log(this.state.items);
      return (
        <div>
          {Array.isArray(this.state.items) ? (
            this.state.items.map((item) => (
              <form className="form-container">
                <input
                  className="field-input"
                  value={item.name}
                  onChange={(e) =>
                    (this.state.updateItem.name = e.target.value)
                  }
                />
                <input
                  className="field-input"
                  value={item.lastName}
                  onChange={(e) => {
                    this.state.updateItem.lastName = e.target.value;
                  }}
                />
                <input
                  className="field-input"
                  value={item.email}
                  onChange={(e) =>
                    (this.state.updateItem.email = e.target.value)
                  }
                />
                <input
                  className="field-input"
                  value={item.login}
                  onChange={(e) =>
                    (this.state.updateItem.login = e.target.value)
                  }
                />
                <input className="submit-input" type="submit" />
              </form>
            ))
          ) : (
            <form className="form-container">
              <input className="field-input" value={this.state.items.name} />
              <input
                className="field-input"
                value={this.state.items.lastName}
              />
              <input className="field-input" value={this.state.items.email} />
              <input className="field-input" value={this.state.items.login} />
              <input className="submit-input" type="submit" readOnly />
            </form>
          )}
        </div>
      );
    } else {
      return "";
    }
  }
}
