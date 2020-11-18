import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
export default function Card(props) {
  let card = props.card;
  console.log(props);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  function handleRefill() {
    handleClose1();
    axios
      .post("http://localhost:4000/refillCard", card)
      .then((res) => handleShow1())
      .catch((err) => console.log(err));
  }
  return (
    <div className="cardItem">
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Refill Done</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All products for all users of this Card has been refilled
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      <img src={card.card_img} alt="CardImg" />
      <h1>{card.card_name}</h1>
      <h2>{card.income_range}</h2>

      <Button variant="outline-primary" size="lg" block onClick={handleRefill}>
        Refill
      </Button>
    </div>
  );
}
