import React, { useState } from "react";
import axios from "axios";
import gender from "../images/gender.jpg";
import user from "../images/users.jpg";
import revenue from "../images/revenue.png";
import refill from "../images/refill.jpg";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Admin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  function handleRefill() {
    handleClose();
    axios
      .post("http://localhost:4000/refill")
      .then((res) => handleShow1())
      .catch((err) => console.log(err));
  }
  return (
    <div className="adminDash">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure??</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All products for all users will be refilled. If you wish to refill for
          a specific card, head to the Cards section
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleRefill}>
            Refill
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Refill Done</Modal.Title>
        </Modal.Header>
        <Modal.Body>All products for all users has been refilled</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      <Link to="/gender">
        <button className="imgbtn">
          <img src={gender} alt="gender" />
          Gender
        </button>
      </Link>
      <Link to="/userStats">
        <button className="imgbtn">
          <img src={user} alt="user" />
          User Stats
        </button>
      </Link>
      <Link to="/revenue">
        <button className="imgbtn">
          <img src={revenue} alt="revenue" />
          Revenue
        </button>
      </Link>
      <button className="imgbtn" onClick={handleShow}>
        <img src={refill} alt="refill" />
        Refill Products
      </button>
    </div>
  );
}
