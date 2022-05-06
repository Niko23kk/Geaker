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
      loadedFile: "",
    };
    this.clickAdd = this.clickAdd.bind(this);
    this.clickAddPhoto = this.clickAddPhoto.bind(this);
  }

  componentDidMount() {
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
    fetch(`${StaticValue.BaseURL}/api/comics`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        name: data.get("name"),
        photo: data.get("photo").includes("http")
          ? data.get("photo")
          : "/Photos/" + data.get("photo"),
        description: data.get("description"),
        pages: parseInt(data.get("pages")),
        hardCover:
          data.get("hardCover") == null ? false : data.get("hardCOver"),
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
            this.setState({ okaymain: "Отправлено", errormain: "" });
          } else if (this.state.status === 400) {
            this.setState({ errormain: result.message });
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
              />
            </div>
            <div className="form-error"> {this.state.error} </div>
            <div className="form-okay"> {this.state.okay} </div>
            <input className="submit-input" type="submit" />
          </form>
          <form className="form-container" onSubmit={this.clickAdd}>
            <h3 className="admin-form-title"> Название </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Имя"
              name="name"
            />
            <h3 className="admin-form-title"> Фото </h3>
            <input
              className="field-input"
              type="text"
              value={this.state.loadedFile}
              placeholder="Фото"
              name="photo"
            />
            <h3 className="admin-form-title"> Описание </h3>
            <textarea
              className="field-input input-comment"
              type="text"
              placeholder="Описание"
              name="description"
            />
            <h3 className="admin-form-title"> Количество страниц </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Количество страниц"
              name="pages"
              onChange={(e) =>
                (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
              }
            />
            <div className="select-container">
              <h3 className="admin-form-title"> Твердый переплет </h3>
              <select
                className="select-mark"
                name="hardCover"
                defaultValue="false"
              >
                <option> true </option> <option> false </option>
              </select>
            </div>
            <h3 hidden className="admin-form-title">
              Подкатегория
            </h3>
            <input
              hidden
              className="field-input"
              type="text"
              placeholder="Подкатегория"
              name="subcategory"
              value={1}
            />
            <h3 className="admin-form-title"> Длина </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Длина"
              name="height"
              onChange={(e) =>
                (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
              }
            />
            <h3 className="admin-form-title"> Ширина </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Ширина"
              name="width"
              onChange={(e) =>
                (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
              }
            />
            <h3 className="admin-form-title"> Издатель </h3>
            <select className="select-filter" defaultValue="" name="publisher">
              <option> </option>
              {this.state.publisher.map((item) => (
                <option> {item.name} </option>
              ))}
            </select>
            <div className="form-error"> {this.state.errormain} </div>
            <div className="form-okay"> {this.state.okaymain} </div>
            <input className="submit-input" type="submit" />
          </form>
        </div>
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
    fetch(`${StaticValue.BaseURL}/api/comics`, {
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
              <input
                type="text"
                className="filter-input"
                placeholder="Поиск"
                onChange={(e) => {
                  this.setState({ filterValue: e.target.value });
                }}
              />
              <div className="select-container">
                <h3> Переплет </h3>
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
                  <option> </option> <option> Мягкий переплет </option>
                  <option> Твердый переплет </option>
                </select>
              </div>
              <div className="select-container">
                <h3> Издательство </h3>
                <select
                  className="select-filter"
                  onChange={(e) =>
                    this.setState({ publishValue: e.target.value })
                  }
                >
                  <option> </option>
                  {this.state.publisher.map((item) => (
                    <option> {item.name} </option>
                  ))}
                </select>
              </div>
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
              <Link
                to={`/adminComicsUpdate/${item.id}`}
                className="product-item"
              >
                <div className="comics-img">
                {item.photo.includes("http") ? (
                  <img
                    src={item.photo}
                    alt="description of image"
                  />
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
              </Link>
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
      loadedFile: "",
    };
    this.clickUpdate = this.clickUpdate.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.clickAddPhoto = this.clickAddPhoto.bind(this);
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
            loadedFile: result.photo,
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
            this.setState({
              okay: result.message,
              loadedFile: result.message,
            });
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

  clickUpdate(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    var publishId;
    this.state.publisher.forEach((publish) => {
      if (publish.name === data.get("publisher")) {
        publishId = publish.id;
      }
    });
    fetch(`${StaticValue.BaseURL}/api/comics`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        id: parseInt(data.get("id")),
        name: data.get("name"),
        photo: data.get("photo").includes("http")
          ? data.get("photo")
          : "/Photos/" + data.get("photo"),
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
            this.setState({ okaymain: "Отправлено", errormain: "" });
            alert("Ok");
          } else if (this.state.status === 400) {
            this.setState({ errormain: result.message });
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
      fetch(`${StaticValue.BaseURL}/api/comics/${this.props.id}`, {
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
              this.setState({ okaymain: "Отправлено", errormain: "" });
              alert("Ok");
              window.location.href = "/adminComics";
            } else if (this.state.status === 400) {
              this.setState({ errormain: result.message });
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
                />
              </div>
              <div className="form-error"> {this.state.error} </div>
              <div className="form-okay"> {this.state.okay} </div>
              <input className="submit-input" type="submit" />
            </form>
            <form className="form-container" onSubmit={this.clickUpdate}>
              <h3 className="admin-form-title"> Идетификатор </h3>
              <input
                className="field-input"
                type="text"
                defaultValue={this.state.comics.id}
                name="id"
                readOnly
              />
              <h3 className="admin-form-title"> Название </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Название"
                defaultValue={this.state.comics.name}
                name="name"
              />
              <h3 className="admin-form-title"> Фото </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Фото"
                value={
                  this.state.loadedFile.indexOf("/Photos/") == 0
                    ? this.state.loadedFile.substring("/Photos/".length)
                    : this.state.loadedFile
                }
                name="photo"
              />
              <h3 className="admin-form-title"> Описание </h3>
              <textarea
                className="field-input input-comment"
                type="text"
                placeholder="Описание"
                defaultValue={this.state.comics.description}
                name="description"
              />
              <h3 className="admin-form-title"> Количество страниц </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Количество страниц"
                defaultValue={this.state.comics.pages}
                name="pages"
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
                }
              />
              <div className="select-container">
                <h3 className="admin-form-title"> Твердый переплет </h3>
                <select
                  className="select-mark"
                  name="hardCover"
                  defaultValue={this.state.comics.hardCover}
                >
                  <option> true </option> <option> false </option>
                </select>
              </div>
              <h3 hidden className="admin-form-title">
                Подкатегория
              </h3>
              <input
                hidden
                className="field-input"
                type="text"
                placeholder="Подкатегория"
                name="subcategory"
                defaultValue={this.state.comics.subcategory}
                readOnly
              />
              <h3 className="admin-form-title"> Длина </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Длина"
                name="height"
                defaultValue={this.state.comics.format.height}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
                }
              />
              <h3 className="admin-form-title"> Ширина </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Ширина"
                name="width"
                defaultValue={this.state.comics.format.width}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^+\d]/g, ""))
                }
              />
              <h3 className="admin-form-title"> Издатель </h3>
              <select
                className="select-filter"
                defaultValue={this.state.comics.publisher}
                name="publisher"
              >
                {this.state.publisher.map((item) => (
                  <option> {item.name} </option>
                ))}
              </select>
              <input className="submit-input" type="submit" />
              <div className="form-error"> {this.state.errormain} </div>
              <div className="form-okay"> {this.state.okaymain} </div>
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
