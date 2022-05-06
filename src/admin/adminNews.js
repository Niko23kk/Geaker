import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";

export class AdminAddNews extends React.Component {
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
    fetch(`${StaticValue.BaseURL}/api/news`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        name: data.get("name"),
        photo: "/Photos/" + data.get("photo"),
        description: data.get("description"),
        articleText: data.get("articleText"),
        hidden: data.get("hidden") === "on" ? true : false,
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
              placeholder="Название"
              name="name"
            />
            <h3 className="admin-form-title"> Фото </h3>
            <input
              className="field-input"
              type="text"
              placeholder="Фото"
              name="photo"
              defaultValue={this.state.loadedFile}
            />
            <h3 className="admin-form-title"> Описание </h3>
            <textarea
              className="field-input input-comment"
              type="text"
              placeholder="Описание"
              name="description"
            />
            <h3 className="admin-form-title"> Тект статьи </h3>
            <textarea
              className="field-input input-comment"
              type="text"
              placeholder="Текст статьи"
              name="articleText"
            />
            <div className="checkbox-container">
              <h3 className="admin-form-title"> Скрыть </h3>
              <input type="checkbox" name="hidden" />
            </div>
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

export class AdminNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/news`, {
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

  static renderNews(news, filterValue) {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {news
            .filter((comic) =>
              comic.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <div className="product-item" onClick={this.clickNews}>
                <div className="product-img">
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
          <div className="catalog-container-vertical">
            <div className="filter-container">
              <input
                type="text"
                className="filter-input"
                placeholder="Поиск"
                onChange={this.filterEvent}
              />
            </div>
            <AdminNewsCard
              items={this.state.items}
              filterValue={this.state.filterValue}
            ></AdminNewsCard>
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

export class AdminNewsCard extends React.Component {
  render() {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {this.props.items
            .filter((news) =>
              news.name
                .toLowerCase()
                .includes(this.props.filterValue.toLowerCase())
            )
            .map((item) => (
              <Link to={`/adminNewsUpdate/${item.id}`} className="news-item">
                <div className="news-img">
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
                <div className="news-description">
                  <span className="product-title-text">{item.description}</span>
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

export function AdminNewsPageGetParams() {
  let { id } = useParams();

  return <AdminUpdateNews id={id} />;
}

export class AdminUpdateNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      news: [],
      isLoadedNews: false,
      loadedFile: "",
    };
    this.clickUpdate = this.clickUpdate.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.clickAddPhoto = this.clickAddPhoto.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/news/${this.props.id}`, {
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
            isLoadedNews: true,
            news: result,
            loadedFile: result.photo,
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
    fetch(`${StaticValue.BaseURL}/api/news`, {
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
        articleText: data.get("articleText"),
        hidden: data.get("hidden") === "on" ? true : false,
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
    fetch(`${StaticValue.BaseURL}/api/news/${this.props.id}`, {
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
            window.location.href = "/adminNews";
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

  render() {
    if (this.state.isLoadedNews) {
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
                name="id"
                defaultValue={this.state.news.id}
                readOnly
              />
              <h3 className="admin-form-title"> Название </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Название"
                name="name"
                defaultValue={this.state.news.name}
              />
              <h3 className="admin-form-title"> Фото </h3>
              <input
                className="field-input"
                type="text"
                placeholder="Фото"
                name="photo"
                value={
                  this.state.loadedFile.indexOf("/Photos/") == 0
                    ? this.state.loadedFile.substring("/Photos/".length)
                    : this.state.loadedFile
                }
              />
              <h3 className="admin-form-title"> Описание </h3>
              <textarea
                className="field-input input-comment"
                type="text"
                placeholder="Описание"
                name="description"
                defaultValue={this.state.news.description}
              />
              <input
                hidden
                className="field-input"
                type="text"
                placeholder="Категория"
                name="category"
                defaultValue={this.state.news.category}
                readOnly
              />
              <h3 className="admin-form-title"> Название </h3>
              <textarea
                className="field-input input-comment"
                type="text"
                placeholder="Тект статьи"
                name="articleText"
                defaultValue={this.state.news.articleText}
              />
              <div className="checkbox-container">
                <h3 className="admin-form-title"> Скрыть </h3>
                <input type="checkbox" name="hidden" />
              </div>
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

export class HiddenAdminNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterValue: "",
    };
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/hiddennews`, {
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

  static renderNews(news, filterValue) {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {news
            .filter((comic) =>
              comic.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <div className="product-item" onClick={this.clickNews}>
                <div className="product-img">
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
              </div>
            ))}
        </div>
      );
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
          <div className="catalog-container-vertical">
            <div className="filter-container">
              <input
                type="text"
                className="filter-input"
                placeholder="Поиск"
                onChange={this.filterEvent}
              />
            </div>
            <AdminHiddenNewsCard
              items={this.state.items}
              filterValue={this.state.filterValue}
            ></AdminHiddenNewsCard>
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

export class AdminHiddenNewsCard extends React.Component {
  render() {
    if (localStorage.idRole == 1) {
      return (
        <div className="product-container">
          {this.props.items
            .filter((news) =>
              news.name
                .toLowerCase()
                .includes(this.props.filterValue.toLowerCase())
            )
            .map((item) => (
              <Link
                to={`/adminHiddenNewsUpdate/${item.id}`}
                className="news-item"
              >
                <div className="news-img">
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
                <div className="news-description">
                  <span className="product-title-text">{item.description}</span>
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

export function AdminHiddenNewsPageGetParams() {
  let { id } = useParams();

  return <AdminHiddenUpdateNews id={id} />;
}

export class AdminHiddenUpdateNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      news: [],
      isLoadedNews: false,
    };
    this.clickUpdate = this.clickUpdate.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  componentDidMount() {
    fetch(`${StaticValue.BaseURL}/api/hiddennews/${this.props.id}`, {
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
            isLoadedNews: true,
            news: result,
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
    fetch(`${StaticValue.BaseURL}/api/news`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        id: parseInt(this.props.id),
        hidden: false,
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
    fetch(`${StaticValue.BaseURL}/api/news/${this.props.id}`, {
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
            window.location.href = "/adminNews";
          } else if (this.state.status === 400) {
            this.setState({ errormain: result.message });
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
    if (this.state.isLoadedNews) {
      if (localStorage.idRole == 1) {
        return (
          <div className="product-page-container">
            <div className="news-page-info-container">
              <div className="product-page-photo">
                <div className="news-page-main-photo">
                  {this.state.news.photo.includes("http") ? (
                    <img
                      src={this.state.news.photo}
                      alt="description of image"
                    />
                  ) : (
                    <img
                      src={StaticValue.BaseURL + this.state.news.photo}
                      alt="description of image"
                    />
                  )}
                </div>
              </div>
              <div className="product-page-info">
                <h1> {this.state.news.name} </h1>
                <div> {this.state.news.articleText} </div>
              </div>
            </div>
            <div className="form-error"> {this.state.errormain} </div>
            <div className="form-okay"> {this.state.okaymain} </div>
            <form className="form-container" onSubmit={this.clickUpdate}>
              <input className="submit-input" type="submit" value="Принять" />
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
