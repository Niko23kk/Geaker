import React from "react";
import ReactDOM from "react-dom";
import "./css/header.css";
import { Link } from "react-router-dom";
import { StaticValue } from "./staticValue";
import { Comics } from "./comics/comics";

export class Header extends React.Component {
  render() {
    if (localStorage.idRole != 1) {
      return (
        <header>
          <ul id="nav">
            <li>
              <Link className="SectionNavigation-Item Section" to="/comics">
                Commics
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="food/all">
                Food
              </Link>
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
                  <Link
                    className="SectionNavigation-Item Section"
                    to="food/food"
                  >
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
              <ul>
                <li>
                  <Link className="SectionNavigation-Item Section" to="addNews">
                    Offer news
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link className="SectionNavigation-Item Section" to="/place">
                Place
              </Link>
            </li>

            <li>
              <Link className="SectionNavigation-Item Section" to="/favorite">
                Favorite
              </Link>
            </li>
            <li>
              <a>Account</a>
              {typeof localStorage.token == "undefined" ? (
                <ul>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/login"
                    >
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
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/logOut"
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </header>
      );
    } else {
      return (
        <header>
          <ul id="nav">
            <li>
              <Link className="SectionNavigation-Item Section" to="adminComics">
                Comics
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminComics"
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminComics"
                  >
                    Update
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="adminFood">
                Food
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminFood"
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminFood"
                  >
                    Update
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="adminGame">
                Game
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminGame"
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminGame"
                  >
                    Update
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="adminNews">
                News
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="hiddenAdminNews"
                  >
                    Hidden
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminNews"
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminNews"
                  >
                    Update
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="adminPlace">
                Place
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminPlace"
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminPlace"
                  >
                    Update
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="addPhoto">
                Add photo
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="parse">
                Parse
              </Link>
            </li>
            <li>
              <a>Account</a>
              {typeof localStorage.token == "undefined" ? (
                <ul>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/login"
                    >
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
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/logOut"
                    >
                      Log out
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
}
