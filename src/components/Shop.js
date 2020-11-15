import React from "react";
import { Jumbotron } from "react-bootstrap";
import Product from "./Product";
function Shop(props) {
  return (
    <div>
      {props.items.length > 0 ? (
        <div className="items">
          {props.items.map((item, key) => (
            <Product
              key={key}
              id={item.id}
              name={item.name}
              url={item.url}
              added={item.added}
              quantity={item.qty}
              price={item.price}
              addItem={props.addItem}
              allowedQuantity={item.allowedQuantity}
            />
          ))}
        </div>
      ) : (
        <div className="cartItem">
          <Jumbotron>
            <h1>Looks like you went on a Shopping Spree!</h1>
            <p>
              All the items that have been allocated to you for this month has
              been consumed! Kindly wait for the next month's ration.
            </p>
          </Jumbotron>
        </div>
      )}
    </div>
  );
}

export default Shop;
