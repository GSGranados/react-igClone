import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link, useHistory } from "react-router-dom";
import { userLoggedOut } from "../actions";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    dispatch(userLoggedOut());
    history.push("/login");
  };

  const renderLinks = () => {
    if (!state) {
      return (
        <React.Fragment>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/new">New Post</Link>
        </li>
        <button
          onClick={() => logout()}
          className="btn waves-effect waves-light #c62828 red darken-3"
        >
          Log Out
        </button>
      </React.Fragment>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link className="brand-logo left" to={state ? "/" : "/login"}>
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
