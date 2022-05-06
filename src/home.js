import React from "react";
import "./css/home.css";
import { Link } from "react-router-dom";
import Icon from "./icons/logo.png";
import Comics1 from "./icons/comics1_com.png";
// import Comics2 from "./icons/comics2_food.png";
import Comics2 from "./icons/comics2_project.png";
import Comics3 from "./icons/comics3_game.png";
import Comics4 from "./icons/comics4_news.png";
import Comics5 from "./icons/comics5_place.png";
import Comics6 from "./icons/comics6_fav.png";
import Comics7 from "./icons/comics7_forum.png";
import Comics8 from "./icons/comics8_char.png";
import Comics9 from "./icons/comics9_yourchar.png";

export class Home extends React.Component {
  render() {
    return (
      <article class="comic catalog-container">
        <Link to="/comics" class="panel panel-default">
          <p class="text top-left"> Комиксы... </p>{" "}
          <p class="text bottom-right"> ...а может и манга </p>{" "}
          <img src={Comics1} />{" "}
        </Link>{" "}
        <Link to="/project" class="panel panel-default">
          <p class="text top-left"> Проекты </p> <img src={Comics2} />
        </Link>{" "}
        <Link to="/game" class="panel panel-speech">
          <p class="speech"> Пора играть, Соник </p> <img src={Comics3} />
        </Link>
        <Link to="/news" class="panel panel-by-width">
          <p class="text top-left"> Чего нового </p> <img src={Comics4} />
        </Link>
        <Link to="/place" class=" panel panel-by-width">
          <p class="text top-left"> Куда пойти </p> <img src={Comics5} />
        </Link>
        <Link to="/favorite" class="panel panel-by-width">
          <p class="text top-left"> Избранное </p> <img src={Comics6} />
        </Link>{" "}
        <Link to="/forumthem" class="panel  panel-forum">
          <img src={Comics7} /> <p class="text bottom-right"> Форум </p>{" "}
        </Link>
        <Link to="/character" class="panel panel-speech">
          <p class="speech"> Возьми меня </p> <img src={Comics8} />
        </Link>
        <Link to="/usercharacter" class="panel panel-by-width">
          <p class="text top-left"> Ваши покемоны </p> <img src={Comics9} />
        </Link>{" "}
      </article>
    );
  }
}
