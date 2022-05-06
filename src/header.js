import React from "react";
import ReactDOM from "react-dom";
import "./css/header.css";
import { Link } from "react-router-dom";
import { StaticValue } from "./staticValue";
import { Comics } from "./comics/comics";
// import MainIco from "./icons/logo.png";
import MainIco from "./icons/jake.gif";
import Coin from "./icons/coin.png";
import { CoinsView } from "./reducer/coinsReducer";

export class Header extends React.Component {
  render() {
    if (localStorage.idRole != 1) {
      return (
        <header>
          <div className="header-info">
            <Link to="/home" className="icon">
              <img src={MainIco} />
            </Link>
            <div className="info">
              <div className="main-info">
                <Link to="/forumThems"> Посетите наш форум </Link>
              </div>
              <div className="character-container">
                <div className="main-info">
                  <Link to="/character"> Персонажи </Link>
                </div>
                <div className="main-info">
                  <Link to="/usercharacter"> Ваша коллекция </Link>
                </div>
              </div>
              <div className="coins">
                <CoinsView> </CoinsView> <img src={Coin} />
              </div>
            </div>
          </div>
          <ul id="nav">
            {/* <li>
                                                                          <Link
                                                                            className="SectionNavigation-Item Section first-nav-item"
                                                                            to="/home"
                                                                          >
                                                                            Главная
                                                                          </Link>
                                                                        </li> */}
            <li>
              <Link
                className="SectionNavigation-Item Section first-nav-item"
                to="/comics"
              >
                Комиксы
              </Link>
            </li>
            {/* <li>
                                                      <Link className="SectionNavigation-Item Section" to="food/all">
                                                        Вкусняшки
                                                      </Link>
                                                      <ul>
                                                        <li>
                                                          <Link
                                                            className="SectionNavigation-Item Section"
                                                            to="food/drink"
                                                          >
                                                            Напитки
                                                          </Link>
                                                        </li>
                                                        <li>
                                                          <Link
                                                            className="SectionNavigation-Item Section"
                                                            to="food/food"
                                                          >
                                                            Перекусить
                                                          </Link>
                                                        </li>
                                                      </ul>
                                                    </li> */}
            <li>
              <Link className="SectionNavigation-Item Section" to="/game">
                Игры
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="/news">
                Новости
              </Link>
              <ul>
                <li>
                  <Link className="SectionNavigation-Item Section" to="addNews">
                    Предложить новость
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="/place">
                Местечки
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="/project">
                Проекты
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="/favorite">
                Избранное
              </Link>
            </li>
            <li>
              <a className="last-nav-item"> Аккаунт </a>
              {typeof localStorage.token == "undefined" ? (
                <ul>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/login"
                    >
                      Вход
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/registration"
                    >
                      Регистрация
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
                      Аккаунт
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/logOut"
                    >
                      Выйти
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
                Комиксы
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminComics"
                  >
                    Добавить
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminComics"
                  >
                    Измениить
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li>
                                                      <Link className="SectionNavigation-Item Section" to="adminFood">
                                                        Вкусняшки
                                                      </Link>
                                                      <ul>
                                                        <li>
                                                          <Link
                                                            className="SectionNavigation-Item Section"
                                                            to="addAdminFood"
                                                          >
                                                            Добавить
                                                          </Link>
                                                        </li>
                                                        <li>
                                                          <Link
                                                            className="SectionNavigation-Item Section"
                                                            to="adminFood"
                                                          >
                                                            Изменить
                                                          </Link>
                                                        </li>
                                                      </ul>
                                                    </li> */}
            <li>
              <Link className="SectionNavigation-Item Section" to="adminGame">
                Игры
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminGame"
                  >
                    Добавить
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminGame"
                  >
                    Изменить
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="adminNews">
                Новости
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="hiddenAdminNews"
                  >
                    Скрытые
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminNews"
                  >
                    Добваить
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminNews"
                  >
                    Изменить
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="adminPlace">
                Местечки
              </Link>
              <ul>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="addAdminPlace"
                  >
                    Добавить
                  </Link>
                </li>
                <li>
                  <Link
                    className="SectionNavigation-Item Section"
                    to="adminPlace"
                  >
                    Изменить
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="addPhoto">
                Фото
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="parse">
                Парсинг
              </Link>
            </li>
            <li>
              <Link className="SectionNavigation-Item Section" to="addStatic">
                Добавить
              </Link>
            </li>
            <li>
              <Link
                className="SectionNavigation-Item Section"
                to="adminForumThems"
              >
                Форум
              </Link>
            </li>
            <li>
              <a> Аккаунт </a>
              {typeof localStorage.token == "undefined" ? (
                <ul>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/login"
                    >
                      Вход
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/registration"
                    >
                      Регистрация
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
                      Аккаунт
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="SectionNavigation-Item Section"
                      to="/logOut"
                    >
                      Выйти
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
