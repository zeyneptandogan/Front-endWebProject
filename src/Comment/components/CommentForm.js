import React, { Component } from "react";
import UserStore from "../../Login-SignUp/UserStore";
import {useParams} from "react-router-dom";


export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",

            comment: {
                userId: UserStore.userId,
                productId: this.props.p_id,
                comment: "",
                fullname:""
            }
        };

        // bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    /**
     * Handle form input field changes & update the state
     */
    handleFieldChange = event => {
        const { value, name } = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };


    /**
     * Form submit handler
     */
    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();

        if (!this.isFormValid()) {
            this.setState({ error: "All fields are required." });
            return;
        }

        // loading status and clear error
        this.setState({ error: "", loading: true });

        // persist the comments on server
        let { comment } = this.state;
        fetch("http://localhost:8080/comments/comment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify({comment: comment.comment, userId: comment.userId, productId: comment.productId, fullname:comment.fullname})

        })


            .then(res => {
                if (res.error) {
                    //console.log(comment);
                    this.setState({ loading: false, error: res.error });
                } else {
                    // add time return from api and push comment to parent state

                    this.props.addComment(comment);

                    // clear the message box
                    this.setState({
                        loading: false,
                        comment: { ...comment, comment: "", fullname: "" }

                    });
                }
            })
            .catch(err => {
                console.log(err);
                //console.log(comment);
                this.setState({
                    error: "Something went wrong while submitting form.",
                    loading: false
                });
            });
    }

    /**
     * Simple validation
     */
    isFormValid() {
        return this.state.comment.fullname !== "" && this.state.comment.comment !== "";
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    render() {

        return (
            <React.Fragment>
                <form method="post" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            onChange={this.handleFieldChange}
                            value={this.state.comment.fullname}
                            className="form-control"
                            placeholder=" Your Name"
                            name="fullname"
                            type="text"
                        />
                    </div>

                    <div className="form-group">
            <textarea
                onChange={this.handleFieldChange}
                value={this.state.comment.comment}
                className="form-control"
                placeholder=" Your Comment"
                name="comment"
                rows="5"
            />
                    </div>

                    {this.renderError()}

                    <div className="form-group">
                        <button disabled={this.state.loading} className="btn btn-primary">
                            Comment &#10148;
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}