import React, { useEffect, useState, useContext } from "react";
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
      console.log(data.posts);
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

  return (
    <div className="home">
      {posts.map((post) => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>{post.postedBy.name}</h5>
            <div className="card-image">
              <img src={post.photo} alt={post.title} />
            </div>
            <div className="card-content">
              {post.likes.includes(state._id) ? (
                <i
                  onClick={() => unlikePost(post._id)}
                  className="material-icons icon-action"
                >
                  thumb_down
                </i>
              ) : (
                <i
                  onClick={() => likePost(post._id)}
                  className="material-icons icon-action"
                >
                  thumb_up
                </i>
              )}
              <h6>{post.likes.length} Likes</h6>
              <h6>{post.title}</h6>
              <p>{post.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
