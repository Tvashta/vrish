import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AddCard(props) {
  const [products, setResp] = useState([]);
  const [card, setCard] = useState({
    income_range: "",
    card_name: "",
    card_img: "",
  });
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/products").then(function (res) {
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

  function handleClick() {
    axios
      .post("http://localhost:4000/cardCat", card)
      .then(function (res) {
        console.log(res);

        setCard({ income_range: "", card_name: "", card_img: "" });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <Link to="/cards">
        <Button variant="outline-dark" className="back">
          Go back
        </Button>
      </Link>
      <div className="addCard">
        <label className="add-p">Name of the card</label>
        <input
          className="input-card"
          onChange={(e) => setCard({ ...card, card_name: e.target.value })}
          value={card.card_name}
        />
        <label className="add-p">Income Range</label>
        <input
          className="input-card"
          onChange={(e) => setCard({ ...card, income_range: e.target.value })}
          value={card.income_range}
        />
        <label className="add-p">Image URL</label>
        <input
          className="input-card"
          onChange={(e) => setCard({ ...card, card_img: e.target.value })}
          value={card.card_img}
        />
        <h4 className="prod">Products</h4>

        {products.map((x, i) => (
          <div key={i}>
            <Row>
              <Col>
                <p className="add-p">{x.name}</p>
              </Col>
              <Col>
                <input className="input-card" placeholder="Qty" />
              </Col>
              <Col>
                <input className="input-card" placeholder="Price" />
              </Col>
            </Row>
          </div>
        ))}
        <Button size="lg" block className="addbtn" onClick={handleClick}>
          Add Card
        </Button>
      </div>
    </div>
  );
}
