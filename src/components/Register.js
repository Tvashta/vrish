import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/girl.png";
import img2 from "../images/boy.png";

function Register(props) {
  const [reg, isregActive] = useState(true);
  const [regText, setRegText] = useState("Register");
  const [logReg, setlogReg] = useState("Already have an account?");
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    phno: "",
  });
  const [confpwd, setconfpwd] = useState(false);
  const [error, setErr] = useState({
    username: "",
    email: "",
    password: "",
    phno: "",
    gen: "",
  });
  const [ok, goodtogo] = useState(false);
  function handleClick() {
    if (reg) {
      setRegText("Login");
      setlogReg("New user? Click to register");
      isregActive(false);
    } else {
      setRegText("Register");
      setlogReg("Already have an account?");
      isregActive(true);
    }
  }

  function handleInput(e) {
    let { name, value } = e.target;
    if (name === "confpwd") {
      if (value !== details.password) setconfpwd(true);
      else setconfpwd(false);
    } else setDetails({ ...details, [name]: value });
    if (value.length === 0) setErr({ ...error, gen: "Enter all fields!" });
    else setErr({ ...error, gen: "" });
    if (name === "phno")
      if (value.length !== 10)
        setErr({ ...error, [name]: "Invalid Phone Number" });
      else setErr({ ...error, [name]: "" });
    else if (name === "password")
      if (value.length < 8)
        setErr({
          ...error,
          [name]: "Password must be atleast 8 characters long",
        });
      else setErr({ ...error, [name]: "" });

    if (
      (details.email.length > 0 &&
        details.password.length > 0 &&
        details.username.length > 0 &&
        details.phno.length === 10) ||
      !reg
    )
      goodtogo(true);
    else {
      goodtogo(false);
    }
  }

  return (
    <div className="wrapper">
      <div className="inner">
        <img src={img1} alt="" className="image-1" />
        <form className="reg-form" action="">
          <h3 className="reg-h3">{regText}</h3>
          <div className="form-holder">
            <span className="lnr lnr-user"></span>
            <input
              type="text"
              name="username"
              className="reg-control"
              placeholder="Username"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <p>{error.password}</p>
          <div className="form-holder">
            <span className="lnr lnr-lock"></span>
            <input
              type="password"
              name="password"
              className="reg-control"
              placeholder="Password"
              onChange={(e) => handleInput(e)}
            />
          </div>
          {reg && (
            <div>
              <p>{error.phno}</p>
              <div className="form-holder">
                <span className="lnr lnr-phone-handset"></span>
                <input
                  type="number"
                  className="reg-control"
                  name="phno"
                  placeholder="Phone Number"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="form-holder">
                <span className="lnr lnr-envelope"></span>
                <input
                  type="email"
                  className="reg-control"
                  name="email"
                  placeholder="Mail"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              {confpwd && (
                <div className="form-holder">
                  <p>Passwords don't match</p>
                </div>
              )}
              <div className="form-holder">
                <span className="lnr lnr-lock"></span>
                <input
                  type="password"
                  className="reg-control"
                  name="confpwd"
                  placeholder="Confirm Password"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <p>{error.gen}</p>
            </div>
          )}
          {ok && (
            <Link to={reg ? "/userEntry" : "/home"}>
              <button
                className="reg-button"
                onClick={() => {
                  props.setDetails(details);
                  !reg && props.userAuth(true);
                }}
              >
                <span>{regText}</span>
              </button>
            </Link>
          )}
          <p className="login-a" onClick={handleClick}>
            {logReg}
          </p>
        </form>

        <img src={img2} alt="" className="image-2" />
      </div>
    </div>
  );
}

export default Register;
