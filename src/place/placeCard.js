import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

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
