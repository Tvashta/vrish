import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AddCard(props) {
  const [products, setResp] = useState([]);
  const [prod, setProd] = useState([]);
  const [product, setProduct] = useState({
    qty: "",
    price: "",
    prod_id: "",
    income_range: "",
    prod_name: "",
  });
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
    console.log(prod);
    axios
      .post("http://localhost:4000/cardCat", card)
      .then(function (res) {
        console.log(res);
        prod.map((x) => {
          let product = {
            qty: x.qty,
            price: x.price,
            income_range: x.income_range,
            prod_id: x.prod_id,
          };
          axios
            .post("http://localhost:4000/prodCard", product)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
        setCard({ income_range: "", card_name: "", card_img: "" });
        window.location.reload(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function addProd(e) {
    if (e.target.value !== "Select") {
      let i = products[products.findIndex((x) => x.name == e.target.value)].id;
      setProduct({ ...product, prod_id: i, prod_name: e.target.value });
      console.log(i);
    }
  }

  function handleClick2() {
    console.log(product);
    setProd([...prod, product]);
    setResp(products.filter((x) => x.id != product.prod_id));
    setProduct({ ...product, qty: "", price: "", prod_id: "", prod_name: "" });
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
          onChange={(e) => {
            setCard({ ...card, income_range: e.target.value });
            setProduct({ ...product, income_range: e.target.value });
          }}
          value={card.income_range}
        />
        <label className="add-p">Image URL</label>
        <input
          className="input-card"
          onChange={(e) => setCard({ ...card, card_img: e.target.value })}
          value={card.card_img}
        />
        <h4 className="prod">Products</h4>
        {prod.map((x, i) => (
          <div key={i}>
            <Row>
              <Col>
                <p className="add-p">{x.prod_name}</p>
              </Col>
              <Col>
                <p className="input-card">{x.qty}</p>
              </Col>
              <Col>
                <p className="input-card">{x.price} </p>
              </Col>
            </Row>
          </div>
        ))}
        <Row>
          <Col>
            <select className="input-card" onChange={(e) => addProd(e)}>
              <option>Select</option>
              {products.map((x, i) => (
                <option key={i}>{x.name}</option>
              ))}
            </select>
          </Col>
          <Col>
            <input
              className="input-card"
              placeholder="Qty"
              value={product.qty}
              onChange={(e) => setProduct({ ...product, qty: e.target.value })}
            />
          </Col>
          <Col>
            <input
              className="input-card"
              placeholder="Price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </Col>
          <Col>
            <Button
              className="addbtn1"
              variant="outline-info"
              onClick={handleClick2}
            >
              <Add />
            </Button>
          </Col>
        </Row>

        <Button size="lg" block className="addbtn" onClick={handleClick}>
          Add Card
        </Button>
      </div>
    </div>
  );
}
