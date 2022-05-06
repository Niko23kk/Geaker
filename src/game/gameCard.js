import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class GameCard extends React.Component {
  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((game) =>
            game.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .filter((game) =>
            game.subcategory
              .toLowerCase()
              .includes(this.props.subcategoryValue.toLowerCase())
          )
          .map((item) => (
            <Link to={`/gamepage/${item.id}`} className="product-item">
              <div className="game-img">
                {item.photo.includes("http") ? (
                  <img src={item.photo} alt="description of image" />
                ) : (
                  <img
                    src={StaticValue.BaseURL + item.photo}
                    alt="description of image"
                  />
                )}
              </div>
              <div className="product-title">
                <span className="product-title-text"> {item.name} </span>
              </div>
            </Link>
          ))}
      </div>
    );
  }
}
