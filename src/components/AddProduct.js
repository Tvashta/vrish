import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AddProduct(props) {
  const [product, setprod] = useState({ name: "", url: "", qtyConsumed: 0 });
  function addProd() {
    axios
      .post("http://localhost:4000/products", product)
      .then(function (res) {
        console.log(res);
        setprod({ name: "", url: "", qtyConsumed: 0 });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return (
    <div>
      <Link to="/products">
        <Button variant="outline-dark" className="back">
          Go back
        </Button>
      </Link>
      <div className="addCard">
        <label className="add-p">Name of the Product</label>
        <input
          value={product.name}
          className="input-card"
          onChange={(e) => setprod({ ...product, name: e.target.value })}
        />
        <label className="add-p">Image URL</label>
        <input
          value={product.url}
          className="input-card"
          onChange={(e) => setprod({ ...product, url: e.target.value })}
        />
        <Button size="lg" block className="addbtn" onClick={addProd}>
          Add Product
        </Button>
      </div>
    </div>
  );
}
