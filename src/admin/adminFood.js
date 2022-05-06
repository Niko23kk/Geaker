import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AdminAddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      publisher: [],
      loadedFile: "",
    };
    this.clickAdd = this.clickAdd.bind(this);
    this.clickAddPhoto = this.clickAddPhoto.bind(this);
  }

  clickAdd(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    fetch(`${StaticValue.BaseURL}/api/food`, {
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

  clickAddPhoto(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("uploadedFile", this.state.selectedFile);
    fetch(`${StaticValue.BaseURL}/api/addPhoto`, {
      method: "Post",
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
      body: data,
    })
      .then((res) => {
        this.setState({
          status: res.status,
        });
        return res.json();
      })
      .then(
        (result) => {
          if (this.state.status === 200) {
            alert("Ok");
            this.setState({
              okay: result.message,
              loadedFile: result.message,
            });
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
        <div>
          <form
            className="form-container add-container"
            onSubmit={this.clickAddPhoto}
          >
            <div class="file-input">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  this.setState({ selectedFile: e.target.files[0] })
                }
              />{" "}
            </div>{" "}
            <div className="form-error"> {this.state.error} </div>{" "}
            <div className="form-okay"> {this.state.okay} </div>{" "}
            <input className="submit-input" type="submit" />
          </form>{" "}
          <form className="form-container" onSubmit={this.clickAdd}>
            <h3 className="admin-form-title"> Name </h3>{" "}
            <input
              className="field-input"
              type="text"
              placeholder="Name"
              name="name"
            />
            <h3 className="admin-form-title"> Photo </h3>{" "}
            <input
              className="field-input"
              type="text"
              placeholder="Photo"
              name="photo"
              defaultValue={this.state.loadedFile}
            />{" "}
            <h3 className="admin-form-title"> Description </h3>{" "}
            <textarea
              className="field-input input-comment"
              type="text"
              placeholder="Description"
              name="description"
            />
            <h3 className="admin-form-title"> Subcategory </h3>{" "}
            <input
              className="field-input"
              type="text"
              placeholder="Subcategory"
              name="subcategory"
              onChange={(e) =>
                (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
              }
            />{" "}
            <div className="form-error"> {this.state.error} </div>{" "}
            <input className="submit-input" type="submit" />
          </form>{" "}
        </div>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}

export class AdminFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/food/all`, {
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

  filterEvent(event) {
    this.setState({ filterValue: event.target.value });
    event.preventDefault();
  }

  static renderfood(food, filterValue) {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {" "}
          {food
            .filter((comic) =>
              comic.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <div className="product-item" onClick={this.clickfood}>
                <div className="food-img">
                  <img src={item.photo} alt="description of image" />
                </div>{" "}
                <div className="product-title">
                  <span className="product-title-text"> {item.name} </span>{" "}
                </div>{" "}
              </div>
            ))}{" "}
        </div>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }

  render() {
    if (this.state !== null) {
      if (localStorage.idRole == 1) {
        return (
          <div className="catalog-container-vertical">
            <div className="filter-container">
              <input
                type="text"
                className="filter-input"
                placeholder="Поиск"
                onChange={this.filterEvent}
              />{" "}
            </div>{" "}
            <AdminFoodCard
              items={this.state.items}
              filterValue={this.state.filterValue}
            ></AdminFoodCard>{" "}
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

export class AdminFoodCard extends React.Component {
  render() {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {" "}
          {this.props.items
            .filter((food) =>
              food.name
                .toLowerCase()
                .includes(this.props.filterValue.toLowerCase())
            )
            .map((item) => (
              <Link to={`/adminFoodUpdate/${item.id}`} className="product-item">
                <div className="food-img">
                  <img src={item.photo} alt="description of image" />
                </div>{" "}
                <div className="product-title">
                  <span className="product-title-text"> {item.name} </span>{" "}
                </div>{" "}
              </Link>
            ))}{" "}
        </div>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}

export function AdminFoodPageGetParams() {
  let { id } = useParams();

  return <AdminUpdateFood id={id} />;
}

export class AdminUpdateFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      food: [],
      isLoadedFood: false,
    };
    this.clickUpdate = this.clickUpdate.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/food/${this.props.id}`, {
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
            isLoadedFood: true,
            food: result,
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
    fetch(`${StaticValue.BaseURL}/api/food`, {
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
    fetch(`${StaticValue.BaseURL}/api/food/${this.props.id}`, {
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
            window.location.href = "/adminFood";
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
    if (this.state.isLoadedFood) {
      if (localStorage.idRole == 1) {
        return (
          <div>
            <form className="form-container" onSubmit={this.clickUpdate}>
              <h3 className="admin-form-title"> Id </h3>{" "}
              <input
                className="field-input"
                type="text"
                name="id"
                defaultValue={this.state.food.id}
                readOnly
              />
              <h3 className="admin-form-title"> Name </h3>{" "}
              <input
                className="field-input"
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={this.state.food.name}
              />{" "}
              <h3 className="admin-form-title"> Photo </h3>{" "}
              <input
                className="field-input"
                type="text"
                placeholder="Photo"
                name="photo"
                defaultValue={
                  this.state.food.photo.split("/")[1] != ""
                    ? this.state.food.photo.split("/")[2]
                    : this.state.food.photo
                }
              />{" "}
              <h3 className="admin-form-title"> Description </h3>{" "}
              <textarea
                className="field-input input-comment"
                type="text"
                placeholder="Description"
                name="description"
                defaultValue={this.state.food.description}
              />{" "}
              <h3 className="admin-form-title"> Category </h3>{" "}
              <input
                className="field-input"
                type="text"
                placeholder="Category"
                name="category"
                defaultValue={this.state.food.category}
                readOnly
              />
              <h3 className="admin-form-title"> Subcategory </h3>{" "}
              <input
                className="field-input"
                type="text"
                placeholder="Subcategory"
                name="subcategory"
                defaultValue={this.state.food.subcategory}
                readOnly
              />
              <div className="form-error"> {this.state.error} </div>{" "}
              <input className="submit-input" type="submit" />
            </form>{" "}
            <form className="form-container" onSubmit={this.clickDelete}>
              <input className="submit-input" type="submit" value="Удалить" />
            </form>{" "}
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
