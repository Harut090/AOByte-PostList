import "./App.css";
import { Component, react } from "react";
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replyTo: null,
      commentText: "",
      commentRate: "",
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.replyTo) {
      this.props.replyToComment(
        this.props.post,
        this.state.replyTo,
        this.state.commentText,
        this.state.commentRate
      );
    } else {
      this.props.addComment(
        this.props.post,
        this.state.commentText,
        this.state.commentRate
      );
    }

    this.setState({
      commentText: "",
      commentRate: "",
    });
  };

  setReplyTo = (comment) => {
    this.setState({ replyTo: comment });
  };

  render() {
    return (
      <div className={this.props.post.disabled ? "disabled" : "post"}>
        <h1>{this.props.post.name}</h1>
        {this.props.post.comments.map((comment, index) => {
          return (
            <li
              className={
                "every-comment " + (comment.parrentId ? "child-comment" : "")
              }
              key={"comment" + index}
            >
              <span>{comment.text}</span>
              <span>{comment.rate}</span>
              {!comment.parrentId && (
                <button
                  onClick={() => {
                    this.setReplyTo(comment);
                  }}
                >
                  reply
                </button>
              )}
            </li>
          );
        })}
        <form onSubmit={this.handleSubmit}>
          {this.state.replyTo && (
            <div>
              Replying to comment {this.state.replyTo.id}
              <button
                onClick={() => {
                  this.setReplyTo(null);
                }}
              >
                [X]
              </button>
            </div>
          )}
          Comment:
          <textarea
            name="commentText"
            onChange={this.handleInputChange}
            value={this.state.commentText}
          ></textarea>
          <br />
          Rate:
          <input
            type="number"
            name="commentRate"
            onChange={this.handleInputChange}
            value={this.state.commentRate}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default Post;
