import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Comics } from "../comics/comics";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AdminAddComics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      publisher: [],
    };
    this.clickAdd = this.clickAdd.bind(this);
  }

  componentDidMount() {
    fetch("api/publisher", {
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
            publisher: result,
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

  clickAdd(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    var publishId;
    this.state.publisher.forEach((publish) => {
      if (publish.name === data.get("publisher")) {
        publishId = publish.id;
      }
    });
    fetch(`${StaticValue.BaseURL}api/comics`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        name: data.get("name"),
        photo: "/Photos/" + data.get("photo"),
        description: data.get("description"),
        pages: parseInt(data.get("pages")),
        hardCover:
          data.get("hardCOver") == null ? false : data.get("hardCOver"),
        subcategory: data.get("subcategory"),
        format: {
          height: parseInt(data.get("height")),
          width: parseInt(data.get("width")),
        },
        publisher: `${publishId}`,
      }),
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
          <h3 className="admin-form-title">Name</h3>
          <input
            className="field-input"
            type="text"
            placeholder="Name"
            name="name"
          />
          <h3 className="admin-form-title">Photo</h3>
          <input
            className="field-input"
            type="text"
            placeholder="Photo"
            name="photo"
          />
          <h3 className="admin-form-title">Description</h3>
          <textarea
            className="field-input input-comment"
            type="text"
            placeholder="Description"
            name="description"
          />
          <h3 className="admin-form-title">Pages</h3>
          <input
            className="field-input"
            type="text"
            placeholder="Pages"
            name="pages"
            onChange={(e) =>
              (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
            }
          />
          <div className="select-container">
            <h3 className="admin-form-title">Hard Cover</h3>
            <select
              className="select-mark"
              name="hardCover"
              defaultValue="false"
            >
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <h3 className="admin-form-title">Subcategory</h3>
          <input
            className="field-input"
            type="text"
            placeholder="Subcategory"
            name="subcategory"
            onChange={(e) =>
              (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
            }
          />
          <h3 className="admin-form-title">Height</h3>
          <input
            className="field-input"
            type="text"
            placeholder="Height"
            name="height"
            onChange={(e) =>
              (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
            }
          />
          <h3 className="admin-form-title">Width</h3>
          <input
            className="field-input"
            type="text"
            placeholder="width"
            name="width"
            onChange={(e) =>
              (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
            }
          />
          <h3 className="admin-form-title">Publisher</h3>
          <select className="select-filter" defaultValue="" name="publisher">
            <option></option>
            {this.state.publisher.map((item) => (
              <option>{item.name}</option>
            ))}
          </select>
          <div className="form-error"> {this.state.error} </div>
          <input className="submit-input" type="submit" />
        </form>
      );
    } else {
      window.location.href = "/notAccess";
    }
  }
}

export class AdminComics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      publisher: [],
      filterValue: "",
      publishValue: "",
      hardCoverValue: "",
    };
  }

  componentDidMount() {
    fetch("api/comics", {
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
    fetch("api/publisher", {
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
            publisher: result,
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
    if (this.state !== null) {
      if (localStorage.idRole == 1) {
        return (
          <div className="catalog-container">
            <div className="filter-container">
              <div className="select-container">
                <h2>Переплет</h2>
                <select
                  className="select-filter"
                  onChange={(e) =>
                    this.setState({
                      hardCoverValue:
                        e.target.value === ""
                          ? ""
                          : e.target.value === "Мягкий переплет"
                          ? false
                          : true,
                    })
                  }
                >
                  <option></option>
                  <option>Мягкий переплет</option>
                  <option>Твердый переплет</option>
                </select>
              </div>
              <div className="select-container">
                <h2>Издательство</h2>
                <select
                  className="select-filter"
                  onChange={(e) =>
                    this.setState({ publishValue: e.target.value })
                  }
                >
                  <option></option>
                  {this.state.publisher.map((item) => (
                    <option>{item.name}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                className="filter-input"
                placeholder="Поиск"
                onChange={(e) => {
                  this.setState({ filterValue: e.target.value });
                }}
              />
            </div>
            <AdminComicsCard
              items={this.state.items}
              filterValue={this.state.filterValue}
              publishValue={this.state.publishValue}
              hardCoverValue={this.state.hardCoverValue}
            ></AdminComicsCard>
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

export class AdminComicsCard extends React.Component {
  render() {
    if (localStorage.idRole == 1) {
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
              <div className="product-item">
                <Link to={`/adminComicsUpdate/${item.id}`}>
                  <div className="comics-img">
                    <img src={item.photo} alt="description of image" />
                  </div>
                  <div className="product-title">
                    <span className="product-title-text"> {item.name} </span>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      );
    }
  }
}

export function AdminComicsPageGetParams() {
  let { id } = useParams();

  return <AdminUpdateComics id={id} />;
}

export class AdminUpdateComics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      publisher: [],
      comics: [],
      isLoadedComics: false,
      isLoadedPublish: false,
    };
    this.clickUpdate = this.clickUpdate.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
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
            isLoadedComics: true,
            comics: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
    fetch(`${StaticValue.BaseURL}/api/publisher`, {
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
            publisher: result,
            isLoadedPublish: true,
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
    var publishId;
    this.state.publisher.forEach((publish) => {
      if (publish.name === data.get("publisher")) {
        publishId = publish.id;
      }
    });
    fetch(`${StaticValue.BaseURL}api/comics`, {
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
        pages: parseInt(data.get("pages")),
        hardCover:
          data.get("hardCOver") == null ? false : data.get("hardCOver"),
        format: {
          height: parseInt(data.get("height")),
          width: parseInt(data.get("width")),
        },
        publisher: `${publishId}`,
      }),
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
    try {
      fetch(`${StaticValue.BaseURL}api/comics/${this.props.id}`, {
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
              window.location.href = "/adminComics";
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
    } catch {
      window.location.href = "/notFound";
    }
  }

  render() {
    if (this.state.isLoadedComics && this.state.isLoadedPublish) {
      if (localStorage.idRole == 1) {
        return (
          <div>
            <form className="form-container" onSubmit={this.clickUpdate}>
              <h3 className="admin-form-title">Id</h3>
              <input
                className="field-input"
                type="text"
                defaultValue={this.state.comics.id}
                name="id"
                readOnly
              />
              <h3 className="admin-form-title">Name</h3>
              <input
                className="field-input"
                type="text"
                placeholder="Name"
                defaultValue={this.state.comics.name}
                name="name"
              />
              <h3 className="admin-form-title">Photo</h3>
              <input
                className="field-input"
                type="text"
                placeholder="Photo"
                defaultValue={
                  this.state.comics.photo.split("/")[1] != ""
                    ? this.state.comics.photo.split("/")[2]
                    : this.state.comics.photo
                }
                name="photo"
              />
              <h3 className="admin-form-title">Description</h3>
              <textarea
                className="field-input input-comment"
                type="text"
                placeholder="Description"
                defaultValue={this.state.comics.description}
                name="description"
              />
              <h3 className="admin-form-title">Pages</h3>
              <input
                className="field-input"
                type="text"
                placeholder="Pages"
                defaultValue={this.state.comics.pages}
                name="pages"
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
                }
              />
              <div className="select-container">
                <h3 className="admin-form-title">Hard Cover</h3>
                <select
                  className="select-mark"
                  name="hardCover"
                  defaultValue={this.state.comics.hardCover}
                >
                  <option>true</option>
                  <option>false</option>
                </select>
              </div>
              <h3 className="admin-form-title">Subcategory</h3>
              <input
                className="field-input"
                type="text"
                placeholder="Subcategory"
                name="subcategory"
                defaultValue={this.state.comics.subcategory}
                readOnly
              />
              <h3 className="admin-form-title">Hright</h3>
              <input
                className="field-input"
                type="text"
                placeholder="Height"
                name="height"
                defaultValue={this.state.comics.format.height}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
                }
              />
              <h3 className="admin-form-title">Width</h3>
              <input
                className="field-input"
                type="text"
                placeholder="width"
                name="width"
                defaultValue={this.state.comics.format.width}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
                }
              />
              <h3 className="admin-form-title">Publisher</h3>
              <select
                className="select-filter"
                defaultValue={this.state.comics.publisher}
                name="publisher"
              >
                {this.state.publisher.map((item) => (
                  <option>{item.name}</option>
                ))}
              </select>
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
