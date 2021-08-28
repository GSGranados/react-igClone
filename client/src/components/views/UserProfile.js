import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userFollowing } from "../../actions";
import { UserContext } from "../../App";
const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const [followed, setFollowed] = useState(state.followers.includes(id));

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

  const followUser = async () => {
    const response = await fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ followId: id }),
    });
    const { result } = await response.json();
    dispatch(userFollowing(result.followers, result.following));
    localStorage.setItem("user", JSON.stringify(result));
    setProfile((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          followers: [...prevState.user.followers, result._id],
        },
      };
    });
    setFollowed(false);
  };
  const unfollowUser = async () => {
    const response = await fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ unfollowId: id }),
    });
    const { result } = await response.json();
    dispatch(userFollowing(result.followers, result.following));
    localStorage.setItem("user", JSON.stringify(result));
    setProfile((prevState) => {
      const newFollowers = prevState.user.followers.filter(
        (follower) => follower !== result._id
      );
      return {
        ...prevState,
        user: {
          ...prevState.user,
          followers: newFollowers,
        },
      };
    });
    setFollowed(true);
  };

  return (
    <>
      {profile ? (
        <div className="profile">
          <div className="profile-container">
            <div>
              <img
                className="profile-image"
                src={profile ? profile.user.profile : "Loading..."}
                alt="Profile"
              />
            </div>
            <div>
              <h4>{profile.user.name}</h4>
              <h5>{profile.user.email}</h5>
              <div className="profile-details">
                <h6>{profile.posts.length} Posts</h6>
                <h6>{profile.user.followers.length} Followers</h6>
                <h6>{profile.user.following.length} Following</h6>
              </div>
              {followed ? (
                <button
                  onClick={() => followUser()}
                  className="btn waves-effect waves-light  follow-button"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={() => unfollowUser()}
                  className="btn waves-effect waves-light  follow-button"
                >
                  Unfollow
                </button>
              )}
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
