import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import img2 from "../images/boy.png";
import { cities, states } from "./utilities/cities";


function UserEntry(props) {
  const [user, setUserDetails] = useState({
    ...props.user,
    sex: "female",
    uname: "",
    addr1: "",
    state: "",
    city: "",
    aadhaar: "",
    members: 0,
  });
  const [state, setState] = useState(0);
  const [city, setCity] = useState("Select City");
  const [family, setfamily] = useState([]);
  const [member, setmember] = useState({
    name: "",
    sex: "Male",
    aadhaar: "",
    age: 0,
  });
  const [ok, goodtogo] = useState(false);

  function handleState(e) {
    setState(states.findIndex((x) => x === e));
    setCity("Select City");
    setUserDetails({ ...user, state: e, city: "" });
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
    if (
      user.uname.length > 0 &&
      user.addr1.length > 2 &&
      user.aadhaar.length === 11 &&
      family.length > 0 &&
      user.state.length &&
      user.city.length
    )
      goodtogo(true);
    else goodtogo(false);
  }

  function addMember() {
    console.log(member);
    if (member.name.length && member.aadhaar.length === 12 && member.age > 0) {
      setfamily([...family, member]);
      setmember({
        name: "",
        sex: "Male",
        aadhaar: "",
        age: 0,
      });
      setUserDetails({ ...user, members: user.members + 1 });
    }
  }

  function handleMember(e) {
    let { name, value } = e.target;
    console.log(member, value);
    setmember({ ...member, [name]: value });
  }

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="reg-form">
          <input
            type="text"
            className="user-ip"
            name="uname"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="text"
            className="user-ip"
            name="addr1"
            placeholder="Address Lane 1"
            onChange={(e) => handleChange(e)}
          />
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
            name="aadhaar"
            placeholder="Aadhar Number"
            onChange={(e) => handleChange(e)}
          />

          <select
            name="sex"
            className="user-ip1"
            onChange={(e) => handleChange(e)}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="trans">Transgender</option>
          </select>
          <p className="user-ip1">{user.members}</p>

          <h4 className="prod">Family Members</h4>
          {family.map((x, i) => (
            <div key={i}>{x.name}</div>
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
            value={member.aadhaar}
            type="number"
            className="user-ip2"
            name="aadhaar"
            placeholder="Aadhar Number"
            onChange={(e) => handleMember(e)}
          />
          <input
            value={member.age}
            type="number"
            className="user-ip1"
            name="age"
            placeholder="Age"
            onChange={(e) => handleMember(e)}
          />
          <select
            value={member.sex}
            name="sex"
            className="user-ip1"
            onChange={(e) => handleMember(e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="trans">Transgender</option>
          </select>

          <Fab className="fabBtn1" onClick={addMember}>
            <Add />
          </Fab>

          {ok ? (
            <Link to="/home">
              <button
                className="reg-button"
                onClick={() => {
                  props.setDetails(user);
                  props.userAuth(true);
                }}
              >
                Register
              </button>
            </Link>
          ) : (
            <p>Kindly fill in all fields to move on</p>
          )}
        </div>
        <img src={img2} alt="" className="image-2" />
      </div>
    </div>
  );
}

export default UserEntry;
