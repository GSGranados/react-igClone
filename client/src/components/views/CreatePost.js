import React, { useState, useEffect } from "react";
import { Constants } from "../../contants";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(Constants.SAMPLE_URL);

  useEffect(() => {
    const createPost = async () => {
      try {
        const postResponse = await fetch("/post/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            title,
            body,
            url,
          }),
        });
        const postResult = await postResponse.json();
        if (!postResult.post) {
          M.toast({
            html: postResult.message,
            classes: Constants.ERROR_CLASSES,
          });
          return;
        }
        M.toast({
          html: postResult.message,
          classes: Constants.SUCCESS_CLASSES,
        });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    if (url !== Constants.SAMPLE_URL) {
      createPost();
    }
  }, [url, body, history, title]);

  const uploadImage = async () => {
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
      setUrl(result.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card input-field">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        type="text"
        placeholder="body"
      />
      <div className="file-field input-field">
        <div className="btn  #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={() => uploadImage()}
        className="btn waves-effect waves-light #64b5f6 blue darken-1 "
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
