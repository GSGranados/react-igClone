import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Constants } from "../../contants";
import M from "materialize-css";
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = async () => {
    if (!Constants.EMAIL_REGEX.test(email)) {
      M.toast({
        html: "Please provide a valid E-mail",
        classes: Constants.ERROR_CLASSES,
      });
      return;
    }
    try {
      const response = await fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      });
      const data = await response.json();
      if (data.error) {
        M.toast({
          html: data.error,
          classes: Constants.ERROR_CLASSES,
        });
        return;
      }
      M.toast({
        html: data.message,
        classes: Constants.SUCCESS_CLASSES,
      });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => postData()}
          className="btn waves-effect waves-light #64b5f6 blue darken-1 login-button"
        >
          Sign Up
        </button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
