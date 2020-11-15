import React, { useState } from "react";
import { Button, ButtonGroup, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

function Pay(props) {
  const { total } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [cashOrCard, setCashOrCard] = useState(null);
  const [cardnoFlag, setCardFlag] = useState(false);
  const [cardError, setCardError] = useState("");
  const [cdetails, Setcdetails] = useState({
    cname: "",
    cno: "",
  });
  function handleCardNo(e) {
    let val = e.target.value;
    let name = e.target.name;
    if (val.length === 0) {
      setCardFlag(true);
      setCardError("Card Number can't be empty");
    } else if (val.length !== 16) {
      setCardFlag(true);
      setCardError("Invalid Card Number");
    }
    Setcdetails({ ...cdetails, [name]: val });
  }

  return (
    <div className="pay">
      <div className="cartItem">
        <h1 className="center">Pay Now</h1>
        <h2 className="center">Rs {total}</h2>
        <ButtonGroup>
          <Button variant="info" onClick={() => setCashOrCard(1)}>
            Card
          </Button>
          <Button variant="info" onClick={() => setCashOrCard(2)}>
            Cash
          </Button>
        </ButtonGroup>
      </div>

      {cashOrCard === 1 ? (
        <div className="cartItem">
          <Form>
            <Form.Group controlId="cardno">
              <Form.Label>Card Number</Form.Label>
              {cardnoFlag && <Form.Text>{cardError}</Form.Text>}
              <Form.Control
                name="cno"
                type="number"
                onChange={(e) => handleCardNo(e)}
                placeholder="Enter card number"
              />
            </Form.Group>
            <Form.Group controlId="cardname">
              <Form.Label>Name on the Card</Form.Label>
              <Form.Control
                name="cname"
                type="text"
                onChange={(e) => handleCardNo(e)}
                placeholder="Enter Name on Card"
              />
            </Form.Group>
            <Form.Row className="align-items-center">
              <Col sm={3} className="my-1">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="number" placeholder="CVV" />
              </Col>
              <Col className="my-1">
                <Form.Label>Expiry Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MM/yyyy"
                  showYearDropdown
                  showMonthYearPicker
                />
              </Col>
            </Form.Row>
            <Link to="/Transaction">
              <Button
                variant="success"
                onClick={() => {
                  props.cardDetails(cdetails);
                }}
              >
                Pay Now
              </Button>
            </Link>
          </Form>
        </div>
      ) : (
        <div className="cartItem">
          <Link to="/Transaction">
            <Button
              variant="success"
              onClick={() => props.cardDetails(cdetails)}
            >
              Pay Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Pay;
