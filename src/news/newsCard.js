import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class NewsCard extends React.Component {
  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((news) =>
            news.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <Link to={`/newspage/${item.id}`} className="news-item">
              <div className="news-img">
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
              <div className="news-description">
                <span className="product-title-text"> {item.description} </span>
              </div>
            </Link>
          ))}
      </div>
    );
  }
}
