import React from "react";
import "./css/catalog.css";
import "./css/form.css";
import { StaticValue } from "./staticValue";
import { AddCoinCounter, AddCoin } from "./reducer/coinsReducer";
import { updateCoin } from ".";

export class AddToFavorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: [],
            isLoaded: false,
        };
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    addToFavorite(e) {
        e.preventDefault();
        updateCoin(5);
        if (!this.state.isFavorite) {
            fetch(`${StaticValue.BaseURL}/api/favorite`, {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.token,
                    },
                    body: JSON.stringify({
                        idProduct: parseInt(this.props.id),
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
        } else {
            fetch(`${StaticValue.BaseURL}/api/favorite/${this.props.id}`, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.token,
                    },
                })
                .then((res) => res.json())
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
    }

    componentDidMount() {
        fetch(`${StaticValue.BaseURL}/api/isFavorite/${this.props.id}`, {
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
                        isFavorite: typeof result === "undefined" ? false : true,
                        isLoaded: true,
                    });
                },
                (error) => {
                    this.setState({
                        isFavorite: false,
                        isLoaded: true,
                    });
                }
            );
    }

    render() {
        if (this.state.isLoaded) {
            return ( <
                div className = "favorite-button"
                onClick = { this.addToFavorite } > { this.state.isFavorite ? StaticValue.Unlike : StaticValue.Like } <
                /div>
            );
        } else {
            return "";
        }
    }
}