import React from "react";
import "../css/catalogItem.css";
import { StaticValue } from "../staticValue";
import { useParams } from "react-router-dom";
import { Comment } from "../comment";

export function ComicsPageGetParams() {
  let { id } = useParams();

  return <ComicsPage id={id} />;
}

export class ComicsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      photos: [],
      isLoadedComics: false,
      isLoadedPhotos: false,
    };
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/comics/${this.props.id}`, {
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
            isLoadedComics: true,
            comics: result,
          });
        },
        (error) => {
          this.setState({
            isLoadedComics: true,
            error,
          });
        }
      );
    fetch(`${StaticValue.BaseURL}/api/photocomics/${this.props.id}`, {
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
            isLoadedPhotos: true,
            photos: result,
          });
        },
        (error) => {
          this.setState({
            isLoadedPhotos: true,
            error,
          });
        }
      );
  }

  render() {
    if (this.state.isLoadedComics && this.state.isLoadedPhotos) {
      return (
        <div className="product-page-container">
          <div className="product-page-info-container">
            <div className="product-page-photo">
              <div className="product-page-main-photo">
                <img src={this.state.comics.photo} />
              </div>
              {this.state.photos !== null && (
                <div className="product-page-other-photo">
                  {this.state.photos.map((photo) => (
                    <img src={photo.photo} />
                  ))}
                </div>
              )}
            </div>
            <div className="product-page-info">
              <h1> {this.state.comics.name} </h1>
              <div> {this.state.comics.description} </div>
              <div className="product-page-more-info">
                <div className="product-property">
                  <div className="product-property-title">
                    Количество страниц
                  </div>
                  <div className="product-value">
                    {this.state.comics.pages}
                    стр
                  </div>
                </div>
                <div className="product-property">
                  <div className="product-property-title"> Переплет </div>
                  <div className="product-value">
                    {this.state.comics.hardCover === true
                      ? StaticValue.HardCover
                      : StaticValue.SoftCover}
                  </div>
                </div>
                <div className="product-property">
                  <div className="product-property-title"> Формат </div>
                  <div className="product-value">
                    {this.state.comics.format.height}x
                    {this.state.comics.format.width}
                  </div>
                </div>
                <div className="product-property">
                  <div className="product-property-title"> Издательство </div>
                  <div className="product-value">
                    {this.state.comics.publisher}
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
