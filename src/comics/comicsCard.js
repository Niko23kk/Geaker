import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class ComicsCard extends React.Component {
  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((comic) =>
            comic.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .filter((comic) =>
            comic.publisher
              .toLowerCase()
              .includes(this.props.publishValue.toLowerCase())
          )
          .filter((comic) =>
            this.props.hardCoverValue === ""
              ? comic.name.includes(this.props.hardCoverValue)
              : comic.hardCover === this.props.hardCoverValue
          )
          .map((item) => (
            <Link to={`/comicspage/${item.id}`} className="product-item">
              <div className="comics-img">
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
