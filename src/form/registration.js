import React from "react";
import "../css/form.css";
import { StaticValue } from "../staticValue";

export class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin(e) {
    e.preventDefault();
    fetch(StaticValue.BaseURL + "api/registration", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idPrivilege: 2,
        login: this.state.login,
        name: this.state.name,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
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
          console.log(result);
          if (this.state.status === 200) {
            localStorage.setItem("token", result.token);
          } else if (this.state.status === 400) {
            console.log(1);
            this.setState({ error: result.message });
          }
        },
        (err) => {
          console.log(2);
          this.setState({
            error: err,
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
        />{" "}
        <input
          className="field-input"
          type="text"
          placeholder="First Name"
          name="name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />{" "}
        <input
          className="field-input"
          type="text"
          placeholder="Last Name"
          name="last_name"
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />{" "}
        <input
          className="field-input"
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />{" "}
        <input
          className="field-input"
          type="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />{" "}
        <div className="form-error"> {this.state.error} </div>{" "}
        <input className="submit-input" type="submit" />
      </form>
    );
  }
}
