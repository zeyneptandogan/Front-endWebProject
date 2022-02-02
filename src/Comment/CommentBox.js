
import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.css";
import './CommentBox.css';
import Rating from "./components/Rating";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import UserStore from "../Login-SignUp/UserStore";

class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: false
        };

        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        // loading
        this.setState({ loading: true });

        // get all the comments
        fetch("http://localhost:8080/comments/getCommentsOfProduct?productId=" + this.props.p_id)
            .then(res => res.json())
            .then(res => {
                //console.log(res);
                this.setState({

                    comments: res,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false });
            });
    }

    /**
     * Add new comment
     * @param {Object} comment
     */
    addComment(comment) {
        this.setState({
            loading: false,
            comments: [...this.state.comments]
        });
    }

    render() {
        if (UserStore.isLoggedIn===true){
        return (
            <div className="App container bg-light shadow">


                <div className="row">
                    <Rating/>
                    <div className="col-4  pt-3 border-right">
                        <h6>Say something about this book!</h6>
                        <CommentForm addComment={this.addComment} p_id={this.props.p_id}/>
                    </div>
                    <div className="col-8  pt-3 bg-white">
                        <CommentList
                            loading={this.state.loading}
                            comments={this.state.comments}
                        />
                    </div>
                </div>
            </div>
        );
    }
        else {
            return (
                <div className="App container bg-light shadow">


                    <div className="row">
                        <div className="col-4  pt-3 border-right">
                            <h6>Say something about this book!</h6>
                            <CommentForm addComment={this.addComment} p_id={this.props.p_id}/>
                        </div>
                        <div className="col-8  pt-3 bg-white">
                            <CommentList
                                loading={this.state.loading}
                                comments={this.state.comments}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default CommentBox;