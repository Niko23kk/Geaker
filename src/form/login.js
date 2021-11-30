import React from "react";
import "../css/form.css";
import { StaticValue } from "../staticValue";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin(e) {
    e.preventDefault();
    fetch(StaticValue.BaseURL + "api/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          localStorage.setItem("token", result.token);
          window.location.href = "/comics";
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
      <form className="form-container" onSubmit={this.clickLogin}>
        <input
          className="field-input"
          type="text"
          placeholder="Login"
          name="login"
          onChange={(e) => this.setState({ login: e.target.value })}
        />
        <input
          className="field-input"
          type="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <input className="submit-input" type="submit" />
      </form>
    );
  }
}
