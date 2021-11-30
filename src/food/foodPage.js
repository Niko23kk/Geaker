import React from "react";
import "../css/catalogItem.css";
import { StaticValue } from "../staticValue";
import { useParams } from "react-router-dom";
import { Comment } from "../comment";

export function FoodPageGetParams() {
  let { id } = useParams();

  return <FoodPage id={id} />;
}

export class FoodPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      photos: [],
      isLoadedfood: false,
    };
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}api/food/${this.props.id}`, {
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
            isLoadedfood: true,
            food: result,
          });
        },
        (error) => {
          this.setState({
            isLoadedfood: true,
            error,
          });
        }
      );
  }

  render() {
    console.log(this.state);
    if (this.state.isLoadedfood) {
      return (
        <div className="product-page-container">
          <div className="product-page-info-container">
            <div className="product-page-photo">
              <div className="food-page-main-photo">
                <img src={this.state.food.photo} />
              </div>
            </div>
            <div className="product-page-info">
              <h1> {this.state.food.name} </h1>{" "}
              <div> {this.state.food.description} </div>{" "}
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
