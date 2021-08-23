import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const obtainningNewPosts = (result) => {
    return posts.map((post) => {
      if (post._id === result._id) {
        return result;
      }
      return post;
    });
  };

  const filteringPosts = (result) => {
    return posts.filter((post) => {
      return post._id !== result._id;
    });
  };

  const likePost = async (id) => {
    const response = await fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    const result = await response.json();
    const newPostData = obtainningNewPosts(result);
    setPosts(newPostData);
  };
  const unlikePost = async (id) => {
    const response = await fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    const result = await response.json();
    const newPostData = obtainningNewPosts(result);
    setPosts(newPostData);
  };

  const commentPost = async (event, postId, text) => {
    event.preventDefault();
    const response = await fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    });
    const result = await response.json();
    const newPostData = obtainningNewPosts(result);
    setPosts(newPostData);
  };

  const deletePost = async (postId) => {
    const response = await fetch(`/delete/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const result = await response.json();
    const newPostData = filteringPosts(result.result);
    setPosts(newPostData);
  };

  return (
    <div className="home">
      {posts.map((post) => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>
              <Link
                to={
                  post.postedBy._id !== state._id
                    ? `/profile/${post.postedBy._id}`
                    : "/profile"
                }
              >
                {post.postedBy.name}
              </Link>
              {post.postedBy._id === state._id && (
                <i
                  className="material-icons icon-action delete"
                  onClick={() => deletePost(post._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={post.photo} alt={post.title} />
            </div>
            <div className="card-content">
              {post.likes.includes(state._id) ? (
                <i
                  onClick={() => unlikePost(post._id)}
                  className="material-icons icon-action"
                >
                  favorite
                </i>
              ) : (
                <i
                  onClick={() => likePost(post._id)}
                  className="material-icons icon-action"
                >
                  favorite_border
                </i>
              )}
              <h6>{post.likes.length} Likes</h6>
              <h6>{post.title}</h6>
              <p>{post.body}</p>
              {post.comments.map((comment) => {
                return (
                  <h6 key={comment.postedBy._id}>
                    <span className="comment-header">
                      {comment.postedBy.name}:
                    </span>
                    {comment.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => commentPost(e, post._id, e.target[0].value)}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
