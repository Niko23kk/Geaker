import React from "react";
import "../css/catalogItem.css";
import { StaticValue } from "../staticValue";
import { useParams } from "react-router-dom";
import { Comment } from "../comment";

export function GamePageGetParams() {
  let { id } = useParams();

  return <GamePage id={id} />;
}

export class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      photos: [],
      isLoadedGame: false,
      isLoadedPhotos: false,
    };
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/game/${this.props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
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
        if (res.status === 404) {
          window.location.href = "/notFound";
        }
        if (res.status === 500) {
          window.location.href = "/internalServerError";
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoadedGame: true,
            game: result,
          });
        },
        (error) => {
          this.setState({
            isLoadedGame: true,
            error,
          });
        }
      );
  }

  render() {
    console.log(this.state);
    if (this.state.isLoadedGame) {
      return (
        <div className="product-page-container">
          <div className="product-page-info-container">
            <div className="product-page-photo">
              <div className="game-page-main-photo">
                <img src={this.state.game.photo} />
              </div>
            </div>
            <div className="product-page-info">
              <h1> {this.state.game.name} </h1>
              <div> {this.state.game.description} </div>
              <div className="product-page-more-info">
                <div className="product-property">
                  <div className="product-property-title">Категория </div>
                  <div className="product-value">
                    {this.state.game.subcategory}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Comment id={this.props.id} />
        </div>
      );
    } else {
      return "";
    }
  }
}
