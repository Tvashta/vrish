import React, { useState } from "react";
import { Button, ButtonGroup, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

function Pay(props) {
  const { cart, total } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [cashOrCard, setCashOrCard] = useState(null);
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

      {cashOrCard == 1 ? (
        <div className="cartItem">
          <Form>
            <Form.Group controlId="cardno">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="number" placeholder="Enter card number" />
            </Form.Group>
            <Form.Group controlId="cardname">
              <Form.Label>Name on the Card</Form.Label>
              <Form.Control type="text" placeholder="Enter Name on Card" />
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
            <Button variant="success">Pay Now</Button>
          </Form>
        </div>
      ) : (
        <div className="cartItem">
          <Button variant="success">Pay Now</Button>
        </div>
      )}
    </div>
  );
}

export default Pay;