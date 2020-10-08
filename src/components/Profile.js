import React from "react";
import { Button } from "react-bootstrap";
function Profile(props) {
  let user = props.userDet;
  if (user.name === undefined || user.name.length === 0)
    user = { ...user, name: "Scar" };
  if (user.username === undefined || user.username.length === 0)
    user = { ...user, username: "ScarRules" };
  if (user.email === undefined || user.email.length === 0)
    user = { ...user, email: "scar@pridelands.com" };
  if (user.phno === undefined || user.phno.length === 0)
    user = { ...user, phno: "9876543210" };
  if (user.addr1 === undefined || user.addr1.length === 0)
    user = { ...user, addr1: "The throne, Pride Rock" };
  if (user.addr2 === undefined || user.addr2.length === 0)
    user = { ...user, addr2: "Pride Lands, Hakuna Matata -7" };
  if (user.aadhar === undefined || user.aadhar.length === 0)
    user = { ...user, aadhar: "111122223333" };
  if (user.sex === undefined || user.sex.length === 0)
    user = { ...user, sex: "Male" };
  if (user.members === undefined || user.members.length === 0)
    user = { ...user, members: "4" };
  return (
    <div className="userscreen">
      <h1 className="center username">{user.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <img
                className="user-img"
                src="https://i.pinimg.com/474x/9f/aa/02/9faa02066709ff87e36bc683be059578--scar-lion-king-the-lion-king.jpg"
                alt=""
              ></img>
              <div className="center-div">
                <Button className="btn-user" variant="outline-dark">
                  Connect with Us
                </Button>
                <Button className="btn-user" variant="outline-info">
                  View Transactions
                </Button>
              </div>
            </td>
            <td>
              <p className="user-head">User Name</p>
              <h2 className="user-info">{user.username}</h2>
              <p className="user-head">Email</p>
              <h2 className="user-info">{user.email}</h2>
              <p className="user-head">Phone Number</p>
              <h2 className="user-info">{user.phno}</h2>
              <p className="user-head">Address</p>
              <h2 className="user-info">{user.addr1}</h2>
              <h2 className="user-info">{user.addr2}</h2>
              <p className="user-head">Sex</p>
              <h2 className="user-info">{user.sex}</h2>
              <p className="user-head">Aadhar Number</p>
              <h2 className="user-info">{user.aadhar}</h2>
              <p className="user-head">Family Member Count</p>
              <h2 className="user-info">{user.members}</h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
