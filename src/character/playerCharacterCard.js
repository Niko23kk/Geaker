import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import Buy from "../icons/coin.png";
import { StaticValue } from "../staticValue";

export class PlayerCharacterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <div className="product-container">
        {" "}
        {this.props.items
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <div className="product-item">
              <div className="character-img">
                <img src={item.photo} alt="description of image" />
              </div>{" "}
              <div className="product-title">
                <span className="product-title-text"> {item.name} </span>{" "}
              </div>{" "}
              <div className="buy-container">
                <div className="cost-container">
                  <div> {item.cost} </div> <img src={Buy} />
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
      </div>
    );
  }
}
