import React from "react";
import "../css/catalogItem.css";
import { StaticValue } from "../staticValue";
import { useParams } from "react-router-dom";
import { Comment } from "../comment";

export function NewsPageGetParams() {
    let { id } = useParams();

    return <NewsPage id = { id }
    />;
}

export class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            photos: [],
            isLoadedNews: false,
            isLoadedPhotos: false,
        };
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
                    });
                },
                (error) => {
                    this.setState({
                        isLoadedNews: true,
                        error,
                    });
                }
            );
    }

    render() {
        if (this.state.isLoadedNews) {
            return ( <
                div className = "product-page-container" >
                <
                div className = "news-page-info-container" >
                <
                div className = "product-page-photo" >
                <
                div className = "news-page-main-photo" >
                <
                img src = { this.state.news.photo }
                />{" "} <
                /div>{" "} <
                /div>{" "} <
                div className = "product-page-info" >
                <
                h1 > { this.state.news.name } < /h1>{" "} <
                div > { this.state.news.articleText } < /div>{" "} <
                /div>{" "} <
                /div>{" "} <
                Comment id = { this.props.id }
                />{" "} <
                /div>
            );
        } else {
            return "";
        }
    }
}