import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function Product(props) {
  const [item, setItem] = useState({
    id: props.id,
    name: props.name,
    url: props.url,
    quantity: props.quantity,
    price: props.price,
    allowedQuantity: props.allowedQuantity,
  });
  function quant(a) {
    if (a === 1)
      setItem({
        ...item,
        quantity: Math.min(item.quantity + 1, item.allowedQuantity),
      });
    else if (a === 2)
      setItem({ ...item, quantity: Math.max(item.quantity - 1, 0) });
  }
  return (
    <div className="item">
      <div className="parent">
        <div
          className="image"
          style={{ backgroundImage: "url(" + item.url + ")" }}
        ></div>
      </div>
      <h3>Rs {item.price}</h3>
      <div className="quant">
        <Fab size="small" color="secondary" onClick={() => quant(1)}>
          <AddIcon />
        </Fab>
        <h5>{item.quantity}</h5>
        <Fab size="small" color="secondary" onClick={() => quant(2)}>
          <RemoveIcon />
        </Fab>
      </div>
      <Button
        variant="success"
        block
        size="lg"
        onClick={() => {
          setItem({ ...item, quantity: 0 });
          props.addItem(item);
        }}
      >
        Add To Cart
      </Button>
    </div>
  );
}

export default Product;
