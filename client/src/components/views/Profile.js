import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { updateProfilePhoto } from "../../actions";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
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

  useEffect(() => {
    const uploadPhoto = async () => {
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "sgranados");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/sgranados/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const result = await response.json();

        const res = await fetch("/updateprofile", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ profile: result.url }),
        });
        const resImage = await res.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, profile: resImage.result.profile })
        );
        dispatch(updateProfilePhoto(resImage.result.profile));
        //window.location.reload(); //really bad practice;
      } catch (error) {
        console.log(error);
      }
    };
    if (image) uploadPhoto();
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div>
          <img
            className="profile-image"
            src={state ? state.profile : ""}
            alt="Profile"
          />
        </div>
        <div>
          <h4>{state ? state.name : "Loading..."}</h4>
          <h5>{state ? state.email : "Loading..."}</h5>
          <div className="profile-details">
            <h6>{myPosts.length} Posts</h6>
            <h6>{state ? state.followers.length : 0} Followers</h6>
            <h6>{state ? state.following.length : 0} Following</h6>
          </div>
          <div className="file-field input-field">
            <div className="btn  #64b5f6 blue darken-1 photo-div">
              <span>Edit Profile Picture</span>
              <input
                onChange={(e) => updatePhoto(e.target.files[0])}
                type="file"
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
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
