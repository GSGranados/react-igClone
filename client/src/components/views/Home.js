import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>Steven</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="My profile"
          />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>Title</h6>
          <p>This is my post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card home-card">
        <h5>Steven</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="My profile"
          />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>Title</h6>
          <p>This is my post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
