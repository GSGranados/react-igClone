import React, { useEffect, useState } from "react";

const Home = () => {
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
              <i className="material-icons">favorite</i>
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
