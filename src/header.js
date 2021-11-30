import React from "react";
import ReactDOM from "react-dom";
import "./css/header.css";
import { Link } from "react-router-dom";
import { StaticValue } from "./staticValue";
import { Comics } from "./comics/comics";

export class Header extends React.Component {
  render() {
    return (
      <header>
        <ul id="nav">
          <li>
            <Link className="SectionNavigation-Item Section" to="/comics">
              Commics
            </Link>
          </li>
          <li>
            <a href="/food/all">Food</a>
            <ul>
              <li>
                <Link
                  className="SectionNavigation-Item Section"
                  to="food/drink"
                >
                  Drink
                </Link>
              </li>
              <li>
                <Link className="SectionNavigation-Item Section" to="food/food">
                  Food
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="SectionNavigation-Item Section" to="/game">
              Game
            </Link>
          </li>

          <li>
            <Link className="SectionNavigation-Item Section" to="/news">
              News
            </Link>
          </li>

          <li>
            <Link className="SectionNavigation-Item Section" to="/place">
              Place
            </Link>
          </li>
          <li>
            <a>Account</a>
            {typeof localStorage.token == "undefined" ? (
              <ul>
                <li>
                  <Link className="SectionNavigation-Item Section" to="/login">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="/registration"
                  >
                    Registration
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="/account"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </header>
    );
  }
}
