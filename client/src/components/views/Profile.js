import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch("/myposts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      setMyPosts(data.posts);
    };
    fetchMyPosts();
  }, []);

  return (
    <div className="profile">
      <div className="profile-container">
        <div>
          <img
            className="profile-image"
            src="https://images.unsplash.com/photo-1534330786040-317bdb76ccff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHBlcnNvbnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
          />
        </div>
        <div>
          <h4>{state ? state.name : "Loading..."}</h4>
          <div className="profile-details">
            <h6>40 Posts</h6>
            <h6>40 Followers</h6>
            <h6>40 Following</h6>
          </div>
        </div>
      </div>
      <div className="profile-highlights">
        {myPosts.map((post) => {
          return (
            <img
              key={post._id}
              src={post.photo}
              alt={post.title}
              className="profile-highlights-item"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
