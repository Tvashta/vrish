import React, { useState } from "react";
import { Link } from "react-router-dom";
import img2 from "../images/boy.png";

function UserEntry(props) {
  const [user, setUserDetails] = useState({
    ...props.user,
    sex: "female",
    name: "",
    addr1: "",
    addr2: "",
    aadhaar: "",
    members: 0,
  });
  const [ok, goodtogo] = useState(false);
  function handleChange(e) {
    let { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
    if (
      user.name.length > 0 &&
      user.addr1.length > 2 &&
      user.members.length > 0 &&
      user.aadhaar.length === 11
    )
      goodtogo(true);
    else goodtogo(false);
  }
  return (
    <div className="wrapper">
      <div className="inner">
        <div className="reg-form">
          <table>
            <tbody>
              <tr>
                <td className="form-holder">
                  <input
                    type="text"
                    className="user-ip"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
                <td className="form-holder">
                  <select
                    name="sex"
                    className="user-ip"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="trans">Transgender</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="form-holder">
                  <input
                    type="text"
                    className="user-ip"
                    name="addr1"
                    placeholder="Address Lane 1"
                    onChange={(e) => handleChange(e)}
                  />
                </td>

                <td className="form-holder">
                  <input
                    type="text"
                    className="user-ip"
                    name="addr2"
                    placeholder="Address Lane 2"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="form-holder">
                  <input
                    type="number"
                    className="user-ip"
                    name="members"
                    placeholder="Number of family members"
                    onChange={(e) => handleChange(e)}
                  />
                </td>

                <td className="form-holder">
                  <input
                    type="number"
                    className="user-ip"
                    name="aadhaar"
                    placeholder="Aadhar Number"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
