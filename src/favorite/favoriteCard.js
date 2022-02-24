import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";

export class FavoriteCard extends React.Component {
  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <Link
              to={
                item.idCategory === 1
                  ? `/comicspage/${item.id}`
                  : item.idCategory === 2
                  ? `/foodpage/${item.id}`
                  : `/gamepage/${item.id}`
              }
              className="product-item"
            >
              <div className="comics-img">
                <img src={item.photo} alt="description of image" />
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
