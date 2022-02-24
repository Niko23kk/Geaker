import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AdminAddPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      publisher: [],
    };
    this.clickAdd = this.clickAdd.bind(this);
  }

  clickAdd(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}api/place`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        name: data.get("name"),
        photo: "/Photos/" + data.get("photo"),
        description: data.get("description"),
        subcategory: data.get("subcategory"),
        mapPlace: data.get("mapPlace"),
      }),
    })
      .then((res) => {
        this.setState({
          status: res.status,
        });
        if (res.status === 400) {
          return res.json();
        }
      })
      .then(
        (result) => {
          if (this.state.status === 200) {
            alert("Ok");
          } else if (this.state.status === 400) {
            this.setState({ error: result.message });
          }
          if (this.state.status === 401) {
            window.location.href = "/notAuthorize";
          }
          if (this.state.status === 403) {
            window.location.href = "/notAccess";
          }
          if (this.state.status === 404) {
            window.location.href = "/notFound";
          }
          if (this.state.status === 500) {
            window.location.href = "/internalServerError";
          }
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
    if (localStorage.idRole == 1) {
      return (
        <form className="form-container" onSubmit={this.clickAdd}>
          <h3 className="admin-form-title"> Name </h3>
          <input
            className="field-input"
            type="text"
            placeholder="Name"
            name="name"
          />
          <h3 className="admin-form-title"> Photo </h3>
          <input
            className="field-input"
            type="text"
            placeholder="Photo"
            name="photo"
          />
          <h3 className="admin-form-title"> Description </h3>
          <textarea
            className="field-input input-comment"
            type="text"
            placeholder="Description"
            name="description"
          />
          <h3 className="admin-form-title"> Map place </h3>
          <input
            className="field-input"
            type="text"
            placeholder="mapPlace"
            name="mapPlace"
          />
          <div className="form-error"> {this.state.error} </div>
          <input className="submit-input" type="submit" />
        </form>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}

export class AdminPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch("api/place", {
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
        if (res.status === 404 || res.status === 400) {
          window.location.href = "/notFound";
        }
        if (res.status === 500) {
          window.location.href = "/internalServerError";
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
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

  static renderProduct(product, filterValue) {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {product
            .filter((comic) =>
              comic.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <div className="product-item" onClick={this.clickProduct}>
                <div className="product-img">
                  <img src={item.photo} alt="description of image" />
                </div>
                <div className="product-title">
                  <span className="product-title-text"> {item.name} </span>
                </div>
              </div>
            ))}
        </div>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }

  filterEvent(event) {
    this.setState({ filterValue: event.target.value });
    event.preventDefault();
  }

  render() {
    if (this.state !== null) {
      if (localStorage.idRole == 1) {
        return (
          <div className="catalog-container">
            <div className="filter-container">
              <input
                type="text"
                className="filter-input"
                placeholder="Поиск"
                onChange={this.filterEvent}
              />
            </div>
            <AdminPlaceCard
              items={this.state.items}
              filterValue={this.state.filterValue}
            ></AdminPlaceCard>
          </div>
        );
      } else {
        window.location.href = "/notAccess";
      }
    } else {
      return "";
    }
  }
}

export class AdminPlaceCard extends React.Component {
  render() {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {this.props.items
            .filter((place) =>
              place.name
                .toLowerCase()
                .includes(this.props.filterValue.toLowerCase())
            )
            .map((item) => (
              <Link to={`/adminPlaceUpdate/${item.id}`} className="place-item">
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
    } else {
      window.location.href = "/notAccess";
    }
  }
}

export function AdminPlacePageGetParams() {
  let { id } = useParams();

  return <AdminUpdatePlace id={id} />;
}

export class AdminUpdatePlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      place: [],
      isLoadedPlace: false,
    };
    this.clickUpdate = this.clickUpdate.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/place/${this.props.id}`, {
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
        if (res.status === 404 || res.status === 400) {
          window.location.href = "/notFound";
        }
        if (res.status === 500) {
          window.location.href = "/internalServerError";
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoadedPlace: true,
            place: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  clickUpdate(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}api/place`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        id: parseInt(data.get("id")),
        name: data.get("name"),
        photo: "/Photos/" + data.get("photo"),
        description: data.get("description"),
        mapPlace: data.get("mapPlace"),
      }),
    })
      .then((res) => {
        this.setState({
          status: res.status,
        });
        if (res.status === 400) {
          return res.json();
        }
      })
      .then(
        (result) => {
          if (this.state.status === 200) {
            alert("Ok");
          } else if (this.state.status === 400) {
            this.setState({ error: result.message });
          }
          if (this.state.status === 401) {
            window.location.href = "/notAuthorize";
          }
          if (this.state.status === 403) {
            window.location.href = "/notAccess";
          }
          if (this.state.status === 404) {
            window.location.href = "/notFound";
          }
          if (this.state.status === 500) {
            window.location.href = "/internalServerError";
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  clickDelete(e) {
    e.preventDefault();
    fetch(`${StaticValue.BaseURL}api/place/${this.props.id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        this.setState({
          status: res.status,
        });
        if (res.status === 400) {
          return res.json();
        }
      })
      .then(
        (result) => {
          if (this.state.status === 200) {
            alert("Ok");
            window.location.href = "/adminPlace";
          } else if (this.state.status === 400) {
            this.setState({ error: result.message });
          }
          if (this.state.status === 401) {
            window.location.href = "/notAuthorize";
          }
          if (this.state.status === 403) {
            window.location.href = "/notAccess";
          }
          if (this.state.status === 404) {
            window.location.href = "/notFound";
          }
          if (this.state.status === 500) {
            window.location.href = "/internalServerError";
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    if (this.state.isLoadedPlace) {
      if (localStorage.idRole == 1) {
        return (
          <div>
            <form className="form-container" onSubmit={this.clickUpdate}>
              <h3 className="admin-form-title"> Id </h3>
              <input
                className="field-input"
                type="text"
                name="id"
                defaultValue={this.state.place.id}
                readOnly
              />
              <h3 className="admin-form-title"> Name </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={this.state.place.name}
              />
              <h3 className="admin-form-title"> Photo </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Photo"
                name="photo"
                defaultValue={
                  this.state.place.photo.split("/")[1] != ""
                    ? this.state.place.photo.split("/")[2]
                    : this.state.place.photo
                }
              />
              <h3 className="admin-form-title"> Description </h3>
              <textarea
                className="field-input input-comment"
                type="text"
                placeholder="Description"
                name="description"
                defaultValue={this.state.place.description}
              />
              <h3 className="admin-form-title"> Category </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Category"
                name="category"
                defaultValue={this.state.place.category}
                readOnly
              />
              <h3 className="admin-form-title"> Map place </h3>
              <input
                className="field-input"
                type="text"
                placeholder="mapPlace"
                name="mapPlace"
                defaultValue={this.state.place.mapPlace}
              />
              <div className="form-error"> {this.state.error} </div>
              <input className="submit-input" type="submit" />
            </form>
            <form className="form-container" onSubmit={this.clickDelete}>
              <input className="submit-input" type="submit" value="Удалить" />
            </form>
          </div>
        );
      } else {
        window.location.href = "/notAccess";
      }
    } else {
      return "";
    }
  }
}
