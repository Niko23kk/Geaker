import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";

export class NewsCard extends React.Component {
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
            <div className="news-item">
              <Link to={`/newspage/${item.id}`}>
                <div className="news-img">
                  <img src={item.photo} alt="description of image" />
                </div>
                <div className="product-title">
                  <span className="product-title-text"> {item.name} </span>
                </div>
                <div className="news-description">
                  <span className="product-title-text">{item.description}</span>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}
