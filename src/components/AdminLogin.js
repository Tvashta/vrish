import React from "react";
import { Link } from "react-router-dom";
export default function AdminLogin(props) {
  return (
    <div className="wrapper">
      <div className="inner">
        <h3 className="admin-h3">Admin Login</h3>
        <img
          className="admin-img"
          alt="admin"
          src="https://wallpaperaccess.com/full/531682.jpg"
        ></img>

        <form className="reg-form" action="">
          <div className="form-holder">
            <span className="lnr lnr-user"></span>
            <input
              type="text"
              name="username"
              className="reg-control"
              placeholder="Username"
            />
          </div>

          <div className="form-holder">
            <span className="lnr lnr-lock"></span>
            <input
              type="password"
              name="password"
              className="reg-control"
              placeholder="Password"
            />
          </div>
          <Link to="/adminHome">
            <button
              className="reg-button"
              onClick={() => {
                props.adminAuth(true);
              }}
            >
              <span>Login</span>
            </button>
          </Link>
          <Link to="/register" className="login-a">
            Not admin?
          </Link>
        </form>
      </div>
    </div>
  );
}
