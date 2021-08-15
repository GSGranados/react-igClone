import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="email@mail.com" />
        <input type="password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 login-button">
          Login
        </button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
