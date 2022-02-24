import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";

export class PlaceCard extends React.Component {
  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((place) =>
            place.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <Link to={`/placepage/${item.id}`} className="place-item">
              <div className="place-img">
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
