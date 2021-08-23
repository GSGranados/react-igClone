import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      setProfile(data);
    };
    fetchMyPosts();
  }, [id]);

  return (
    <>
      {profile ? (
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
              <h4>{profile.user.name}</h4>
              <h5>{profile.user.email}</h5>
              <div className="profile-details">
                <h6>{profile.posts.length} Posts</h6>
                <h6>40 Followers</h6>
                <h6>40 Following</h6>
              </div>
            </div>
          </div>
          <div className="profile-highlights">
            {profile.posts.map((post) => {
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
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default UserProfile;
