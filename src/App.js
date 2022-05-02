import "./App.css";
import { Component, react } from "react";
import Pool from "./Pool";
import Column from "./Column";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          disabled: false,
          rate: 0,
          id: Math.round(Math.random() * 10000000),
          name: "the London is the best capital city of the world",
          comments: [
            {
              id: Math.round(Math.random() * 10000000),
              text: "Arushyan",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Xachatryan",
              rate: 8,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Hunanyan",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Muradyan",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Mirzaxanyan",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Gasparyan",
              rate: 7,
            },
          ],
        },
        {
          disabled: false,
          rate: 0,
          id: Math.round(Math.random() * 10000000),
          name: "without IT the world wont be improved",
          comments: [
            {
              id: Math.round(Math.random() * 10000000),
              text: "Abelyan",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Sargsyan",
              rate: 2,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Muradyan",
              rate: 6,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Giozalhan",
              rate: 1,
            },
          ],
        },

        {
          disabled: false,
          rate: 0,
          id: Math.round(Math.random() * 10000000),
          name: "the Liverpool is the favorite of Championse League",
          comments: [
            {
              id: Math.round(Math.random() * 10000000),
              text: "text 1",
              rate: 8,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "text 2",
              rate: 7,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "text 3",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "text 4",
              rate: 9,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "text 5",
              rate: 9,
            },
          ],
        },

        {
          disabled: false,
          rate: 0,
          id: Math.round(Math.random() * 10000000),
          name: "we must save the wild nature",
          comments: [
            {
              id: Math.round(Math.random() * 10000000),
              text: "Pashayan",
              rate: 4,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "sahakyan",
              rate: 1,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Mxitaryan",
              rate: 3,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Hakobyan",
              rate: 7,
            },
            {
              id: Math.round(Math.random() * 10000000),
              text: "Mirzoyan",
              rate: 5,
            },
          ],
        },
        {
          disabled: false,
          rate: 0,
          id: Math.round(Math.random() * 10000000),
          name: "Another post",
          comments: [
            { id: Math.round(Math.random() * 10000000), text: "text", rate: 1 },
            { id: Math.round(Math.random() * 10000000), text: "text", rate: 4 },
          ],
        },
      ],
      postsPerPage: 2,
    };
  }
  getPostWithHigestRate = () => {
    let posts = this.state.posts;
    let enabledPosts = posts.filter((post) => {
      return !post.disabled;
    });

    let highestPostRate = -Infinity;
    let highestPostIndex = 0;
    enabledPosts.map((post, index) => {
      let rate = this.getPostRate(post);
      if (rate > highestPostRate) {
        highestPostRate = rate;
        highestPostIndex = index;
      }
    });

    return enabledPosts[highestPostIndex];
  };

  getPostRate = (post) => {
    let sum = 0;
    post.comments.map((comment, index) => {
      sum += comment.rate;
    });

    return sum / post.comments.length;
  };

  updatePostStatus = (post, isDisabled) => {
    let posts = this.state.posts;
    posts.map((element, index) => {
      if (post.id === element.id) {
        posts[index].disabled = isDisabled;
        return;
      }
    });

    this.setState({ posts: posts });
  };

  addComment = (post, text, rate) => {
    let posts = this.state.posts;
    posts.map((element, index) => {
      if (post.id === element.id) {
        posts[index].comments.push({
          text: text,
          rate: parseInt(rate),
          id: Math.round(Math.random() * 10000000),
        });
        return;
      }
    });

    this.setState({ posts: posts });
  };

  replyToComment = (post, comment, text, rate) => {
    let posts = this.state.posts;
    posts.map((element, index) => {
      if (post.id === element.id) {
        posts[index].comments.map((comm, commentIndex) => {
          if (comment.id === comm.id) {
            posts[index].comments.splice(commentIndex + 1, 0, {
              text: text,
              rate: parseInt(rate),
              id: Math.round(Math.random() * 10000000),
              parrentId: comment.id,
            });
            return;
          }
        });
      }
    });

    this.setState({ posts: posts });
  };

  render() {
    return (
      <div className="App">
        <Pool
          posts={this.state.posts}
          postsPerPage={this.state.postsPerPage}
          addComment={this.addComment}
          replyToComment={this.replyToComment}
        />
        <Column
          getPostRate={this.getPostRate}
          getPostWithHigestRate={this.getPostWithHigestRate}
          updatePostStatus={this.updatePostStatus}
        />
        <Column
          getPostRate={this.getPostRate}
          getPostWithHigestRate={this.getPostWithHigestRate}
          updatePostStatus={this.updatePostStatus}
        />
      </div>
    );
  }
}

export default App;
