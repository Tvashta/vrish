import React from "react";
import { Button } from "react-bootstrap";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function Product(props) {
  return (
    <div className="item">
      <div className="parent">
        <div
          className="image"
          style={{ backgroundImage: "url(" + props.url + ")" }}
        ></div>
      </div>
      <h3>Rs {props.price}</h3>
      <div className="quant">
        <Fab size="small" color="secondary">
          <AddIcon />
        </Fab>
        <h5>{props.quantity}</h5>
        <Fab size="small" color="secondary">
          <RemoveIcon />
        </Fab>
      </div>
      <Button variant="success" block size="lg">
        Add To Cart
      </Button>
    </div>
  );
}

export default Product;
