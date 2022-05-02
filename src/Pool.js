import "./App.css";
import { Component, react } from "react";
import Post from "./Post";
class Pool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      pages: [],
      filteredPosts: [],
      postsToShow: [],
      currentPage: null,
    };
  }

  componentDidMount = () => {
    this.setPage(1);
  };

  setPage = (page) => {
    let posts = this.state.searchText.length
      ? this.state.filteredPosts
      : this.props.posts;

    let start = (page - 1) * this.props.postsPerPage;
    let postsToShow = posts.slice(start, start + this.props.postsPerPage);

    let pages = [];
    for (let i = 0; i < posts.length / this.props.postsPerPage; i++) {
      pages.push(i + 1);
    }

    this.setState({
      pages: pages,
      postsToShow: postsToShow,
      currentPage: page,
    });
  };

  search = (e) => {
    let searchText = e.target.value;
    let filteredPosts;
    if (searchText.length) {
      filteredPosts = this.props.posts.filter((post) => {
        return (
          post.name.toLowerCase().includes(searchText.toLowerCase()) ||
          post.comments.filter((comment) => {
            return comment.text
              .toLowerCase()
              .includes(searchText.toLowerCase());
          }).length
        );
      });
    } else {
      filteredPosts = this.props.posts;
    }

    this.setState(
      {
        searchText: searchText,
        filteredPosts: filteredPosts,
      },
      () => {
        this.setPage(1);
      }
    );
  };

  render() {
    return (
      <div className="list-of-postes">
        <input onChange={this.search} />
        {this.state.postsToShow.map((post, index) => {
          return (
            <Post
              post={post}
              key={"post" + post.id}
              addComment={this.props.addComment}
              replyToComment={this.props.replyToComment}
            />
          );
        })}
        <ul>
          {this.state.pages.map((page) => {
            return (
              <li key={"page" + page}>
                <a
                  className={
                    this.state.currentPage === page ? "active-page" : ""
                  }
                  onClick={() => {
                    this.setPage(page);
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Pool;
