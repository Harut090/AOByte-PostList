import "./App.css";
import { Component, react } from "react";
class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  addPost = () => {
    let list = this.state.list;
    let post = this.props.getPostWithHigestRate();
    if (post) {
      list.push(post);
      this.props.updatePostStatus(post, true);
      this.setState({ list: list });
    }
  };

  deletePost = (index) => {
    let list = this.state.list;
    this.props.updatePostStatus(list[index], false);
    list.splice(index, 1);
    this.setState({ list: list });
  };

  sortByRate = (direction) => {
    let list = this.state.list;
    list.sort((a, b) => {
      return direction === "up"
        ? this.props.getPostRate(a) - this.props.getPostRate(b)
        : this.props.getPostRate(b) - this.props.getPostRate(a);
    });
    this.setState({ list: list });
  };

  render() {
    return (
      <div className="container-column2">
        <div className="show-buttons">
          <button
            className="show-post-ascending"
            onClick={() => {
              this.sortByRate("down");
            }}
          >
            ↓
          </button>
          <button
            className="show-post-descending"
            onClick={() => {
              this.sortByRate("up");
            }}
          >
            ↑
          </button>
          <h5 className="show-post-title">highest average rating</h5>
          <button className="show-post" onClick={this.addPost}>
            +
          </button>
        </div>
        {this.state.list.length
          ? this.state.list.map((post, index) => {
              return (
                <div className="highest-rate-comments" key={index + post.name}>
                  <li className="highest-rate-comments-list">{post.name}</li>
                  <button
                    className="highest-rate-comments-button-delete"
                    onClick={() => this.deletePost(index)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <span className="highest-rate-comments-list-rate">
                    {this.props.getPostRate(post).toFixed(2)}
                  </span>
                </div>
              );
            })
          : ""}
      </div>
    );
  }
}
export default Column;
