import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import Buy from "../icons/coin.png";
import { StaticValue } from "../staticValue";

export class CharacterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.buyCharacter = this.buyCharacter.bind(this);
  }

  buyCharacter(e) {
    fetch(`${StaticValue.BaseURL}/api/usercharacter`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        idCharacter: parseInt(e),
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          window.location.href = "/notAuthorize";
        }
        if (res.status === 403) {
          window.location.href = "/notAccess";
        }
        if (res.status === 404 || res.status === 400) {
          window.location.href = "/notFound";
        }
        if (res.status === 409) {
          alert("Поднакопите монеток");
        }
        if (res.status === 500) {
          window.location.href = "/internalServerError";
        }
      })
      .then(
        (result) => {
          this.setState({
            isFavorite: !this.state.isFavorite ? true : false,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div className="product-container">
        {this.props.items
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.props.filterValue.toLowerCase())
          )
          .map((item) => (
            <div className="product-item">
              <div className="character-img">
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
              <div className="buy-container">
                <div
                  className="buy-button"
                  onClick={() => this.buyCharacter(item.id)}
                >
                  Buy
                </div>
                <div className="cost-container">
                  <div> {item.cost} </div> <img src={Buy} />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
