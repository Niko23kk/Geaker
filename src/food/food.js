import React from "react";
import ReactDOM from "react-dom";

import { FoodCard } from "./foodCard";
import "../css/catalog.css";
import { StaticValue } from "../staticValue";
import { useParams } from "react-router-dom";
import { canCoinUpdate } from "..";
import { AddCoinCounter } from "../reducer/coinsReducer";

export function FoodGetParams() {
    let { type } = useParams();

    return type === "food" ? ( <
        Food type = { type }
        />
    ) : type === "drink" ? ( <
        Drink type = { type }
        />
    ) : ( <
        AllFood type = { type }
        />
    );
}

export class AllFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filterValue: "",
        };
        this.filterEvent = this.filterEvent.bind(this);
    }

    componentDidMount() {
        fetch(`${StaticValue.BaseURL}/api/food/${this.props.type}`, {
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

    render() {
        if (this.state !== null) {
            return ( <
                div className = "catalog-container-vertical" > { canCoinUpdate ? < AddCoinCounter value = { 4 } > < /AddCoinCounter> : <></ > } <
                div className = "filter-container" >
                <
                input type = "text"
                className = "filter-input"
                placeholder = "Поиск"
                onChange = { this.filterEvent }
                /> <
                /div> <
                FoodCard items = { this.state.items }
                filterValue = { this.state.filterValue } >
                < /FoodCard> <
                /div>
            );
        } else {
            return "";
        }
    }
}

export class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filterValue: "",
        };
        this.filterEvent = this.filterEvent.bind(this);
    }

    componentDidMount() {
        fetch(`${StaticValue.BaseURL}/api/food/${this.props.type}`, {
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

    render() {
        if (this.state !== null) {
            return ( <
                div className = "catalog-container-vertical" > { canCoinUpdate ? < AddCoinCounter value = { 4 } > < /AddCoinCounter> : <></ > } <
                div className = "filter-container" >
                <
                input type = "text"
                className = "filter-input"
                placeholder = "Поиск"
                onChange = { this.filterEvent }
                /> <
                /div> <
                FoodCard items = { this.state.items }
                filterValue = { this.state.filterValue } >
                < /FoodCard> <
                /div>
            );
        } else {
            return "";
        }
    }
}

export class Drink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filterValue: "",
        };
        this.filterEvent = this.filterEvent.bind(this);
    }

    componentDidMount() {
        fetch(`${StaticValue.BaseURL}/api/food/${this.props.type}`, {
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

    render() {
        if (this.state !== null) {
            return ( <
                div className = "catalog-container-vertical" > { canCoinUpdate ? < AddCoinCounter value = { 4 } > < /AddCoinCounter> : <></ > } <
                div className = "filter-container" >
                <
                input type = "text"
                className = "filter-input"
                placeholder = "Поиск"
                onChange = { this.filterEvent }
                /> <
                /div> <
                FoodCard items = { this.state.items }
                filterValue = { this.state.filterValue } >
                < /FoodCard> <
                /div>
            );
        } else {
            return "";
        }
    }
}