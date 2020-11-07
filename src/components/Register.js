import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/girl.png";
import img2 from "../images/boy.png";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { cities, states } from "./utilities/cities";
import axios from "axios";
function Register(props) {
  const [response, setResp] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/cardCat").then(function (res) {
          console.log(res.data);
          setResp(res.data);
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, []);
  const [user, setUserDetails] = useState({
    uname: "",
    username: "",
    ph_no: "",
    aadhar: "",
    email: "",
    addr1: "",
    city: "",
    state: "",
    sex: "F",
    income_range: "",
  });
  const [members, setMembers] = useState(0);
  const [reg, isregActive] = useState(true);
  const [regText, setRegText] = useState("Register");
  const [logReg, setlogReg] = useState("Already have an account?");
  const [confpwd, setconfpwd] = useState(false);
  const [error, setErr] = useState({
    username: "",
    email: "",
    password: "",
    ph_no: "",
    gen: "",
  });
  const [ok, goodtogo] = useState(false);
  const [state, setState] = useState(0);
  const [city, setCity] = useState("Select City");
  const [family, setfamily] = useState([]);
  const [member, setmember] = useState({
    name: "",
    sex: "M",
    aadhar: "",
    dob: "",
  });

  function handleState(e) {
    setState(states.findIndex((x) => x === e));
    setCity("Select City");
    let city = cities[state].split("|");
    setUserDetails({ ...user, state: e, city: city[0] });
  }

  function addMember() {
    console.log(member);
    if (member.name.length && member.aadhar.length === 12) {
      setfamily([...family, member]);
      setmember({
        name: "",
        sex: "M",
        aadhar: "",
        dob: "",
      });
      setMembers(members + 1);
    }
  }

  function handleMember(e) {
    let { name, value } = e.target;
    setmember({ ...member, [name]: value });
  }
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
      if (value !== user.password) setconfpwd(true);
      else setconfpwd(false);
    } else setUserDetails({ ...user, [name]: value });
    if (value.length === 0) setErr({ ...error, gen: "Enter all fields!" });
    else setErr({ ...error, gen: "" });
    if (name === "ph_no")
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
      (user.email.length > 0 &&
        user.username.length > 0 &&
        user.ph_no.length === 10 &&
        user.uname.length > 0 &&
        user.addr1.length > 2) ||
      //&&user.aadhar.length === 11 &&
      // family.length > 0 &&
      // user.state.length &&
      // user.city.length
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
            />
          </div>
          {reg && (
            <div>
              <p>{error.ph_no}</p>
              <div className="form-holder">
                <span className="lnr lnr-phone-handset"></span>
                <input
                  type="number"
                  className="reg-control"
                  name="ph_no"
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
              <h4 className="prod">User Details</h4>
              <input
                type="text"
                className="user-ip"
                name="uname"
                placeholder="Name"
                onChange={(e) => handleInput(e)}
              />

              <input
                type="text"
                className="user-ip"
                name="addr1"
                placeholder="Address Lane 1"
                onChange={(e) => handleInput(e)}
              />
              <select
                type="text"
                className="user-ip"
                name="income_range"
                onChange={(e) => handleInput(e)}
              >
                <option>Select Income Range</option>
                {response.map((x, i) => (
                  <option key={i}>{x.income_range}</option>
                ))}
              </select>

              <select
                id="state"
                className="user-ip2"
                required
                onChange={(e) => handleState(e.target.value)}
              >
                {states.map((x, i) => (
                  <option key={i}>{x}</option>
                ))}
              </select>
              <select
                id="city"
                className="user-ip2 float-r"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setUserDetails({ ...user, city: e.target.value });
                }}
              >
                {cities[state].split("|").map((x, i) => (
                  <option key={i}>{x}</option>
                ))}
              </select>

              <input
                type="number"
                className="user-ip"
                name="aadhar"
                placeholder="Aadhar Number"
                onChange={(e) => handleInput(e)}
              />

              <select
                name="sex"
                className="user-ip1"
                onChange={(e) => handleInput(e)}
              >
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="T">Transgender</option>
              </select>
              <p className="user-ip1">{members}</p>

              <h4 className="prod">Family Members</h4>
              {family.map((x, i) => (
                <div className="family" key={i}>
                  <h6>{x.name}</h6>
                  <p className="no-margin">{x.aadhar}</p>
                  <p className="no-margin">{x.dob}</p>
                  <p className="no-margin">{x.sex}</p>
                </div>
              ))}
              <input
                value={member.name}
                type="text"
                className="user-ip"
                name="name"
                placeholder="Name"
                onChange={(e) => handleMember(e)}
              />
              <input
                value={member.aadhar}
                type="number"
                className="user-ip2"
                name="aadhar"
                placeholder="Aadhar Number"
                onChange={(e) => handleMember(e)}
              />
              <input
                className="user-ip2 float-r"
                name="dob"
                type="date"
                value={member.dob}
                onChange={(e) => handleMember(e)}
              />

              <select
                value={member.sex}
                name="sex"
                className="user-ip2"
                onChange={(e) => handleMember(e)}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="T">Transgender</option>
              </select>

              <Fab className="fabBtn1" onClick={addMember}>
                <Add />
              </Fab>
              <p>{error.gen}</p>
            </div>
          )}
          {ok && (
            <Link to="/home">
              <button
                className="reg-button"
                onClick={() => {
                  let p = "http://localhost:4000/username/" + user.username;
                  reg
                    ? props.setDetails(user, family)
                    : axios
                        .get(p)
                        .then((res) => props.setDetails(res.data[0]), family)
                        .catch((err) => console.log(err));

                  props.userAuth(true);
                }}
              >
                <span>{regText}</span>
              </button>
            </Link>
          )}
          <table>
            <tbody>
              <tr>
                <td>
                  <p className="login-a" onClick={handleClick}>
                    {logReg}
                  </p>
                </td>
                <td>
                  <Link to="/adminLogin" className="login-a">
                    Admin login
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <img src={img2} alt="" className="image-2" />
      </div>
    </div>
  );
}

export default Register;
