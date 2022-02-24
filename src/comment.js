import React from "react";
import "./css/catalog.css";
import "./css/form.css";
import { StaticValue } from "./staticValue";

export class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: 1,
            comment: "",
            isLoaded: false,
        };
        this.addComment = this.addComment.bind(this);
    }

    addComment(e) {
        e.preventDefault();
        fetch(StaticValue.BaseURL + "api/comment", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.token,
                },
                body: JSON.stringify({
                    comment1: this.state.comment,
                    mark: parseInt(this.state.mark),
                    idProduct: parseInt(this.props.id),
                }),
            })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.componentDidMount();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidMount() {
        fetch(StaticValue.BaseURL + `api/comment/${this.props.id}`, {
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
                        items: result,
                        isLoaded: true,
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
        if (this.state.isLoaded) {
            return ( <
                div className = "comment-container" >
                <
                form className = "form-container"
                onSubmit = { this.addComment } >
                <
                div className = "select-container" >
                <
                h3 > Оценка: < /h3> <
                select className = "select-mark"
                onChange = {
                    (e) => this.setState({ mark: e.target.value }) } >
                <
                option > 1 < /option> <
                option > 2 < /option> <
                option > 3 < /option> <
                option > 4 < /option> <
                option > 5 < /option> <
                option > 6 < /option> <
                option > 7 < /option> <
                option > 8 < /option> <
                option > 9 < /option> <
                option > 10 < /option> <
                /select> <
                /div> <
                textarea className = "field-input input-comment"
                type = "text"
                placeholder = "Comment"
                name = "comment"
                onChange = {
                    (e) => this.setState({ comment: e.target.value }) }
                /> <
                input className = "submit-input"
                type = "submit" / >
                <
                /form> {
                    this.state.items.map((comment) => ( <
                        div >
                        <
                        div className = "user-comment" > { comment.login } < /div> <
                        div className = "text-comment" > { comment.comment1 } < /div> <
                        div className = "mark-comment" > Оценка { comment.mark } < /div> <
                        /div>
                    ))
                } <
                /div>
            );
        } else {
            return "";
        }
    }
}