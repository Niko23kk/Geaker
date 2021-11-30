import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class FoodCard extends React.Component {
  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((comic) =>
            comic.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <div className="product-item">
              <Link to={`/foodpage/${item.id}`}>
                <div className="food-img">
                  <img
                    src={`${StaticValue.BaseURL}` + item.photo}
                    alt="description of image"
                  />
                </div>{" "}
                <div className="product-title">
                  <span className="product-title-text"> {item.name} </span>{" "}
                </div>{" "}
              </Link>{" "}
            </div>
          ))}{" "}
      </div>
    );
  }
}
