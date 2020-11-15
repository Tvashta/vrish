import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      <div className="userscreen">
        <div className="row">
          <div className="container emp-profile">
            <form method="post">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-img">
                    <img
                      src="data:image/png;base64,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"
                      alt=""
                    />
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input type="file" name="file" />
                    </div>
                  </div>
                </div>
                <div className="profile-head">
                  <h5>
                    <legend>{user.username}</legend>
                  </h5>
                </div>
              </div>
              <div className="row"></div>
              <div className="col-md-8">
                <div className="heading">
                  <br></br>
                  <h5>About</h5>
                </div>
                <hr className="line"></hr>
                <div className="position">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.username}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Phone Number</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.phno}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Address</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.addr1}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Sex</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.sex}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Aadhar</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.aadhar}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Family Member count</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.members}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="position">
              <div className="row">
                <div className="col">
                  <Form>
                    <Link to="/Connect">
                      <Button
                        className="btn-user"
                        type="submit"
                        variant="outline-dark"
                      >
                        Connect with Us
                      </Button>
                    </Link>
                  </Form>
                </div>

                <div className="col">
                  <Form>
                    <Link to="/User_transactions">
                      <Button
                        className="btn-user"
                        type="submit"
                        variant="outline-info"
                      >
                        View Transactions
                      </Button>
                    </Link>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
