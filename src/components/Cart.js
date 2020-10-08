import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
function Cart(props) {
  var l = props.items.length === 0;
  return l ? (
    <div className="cart">
      <Jumbotron>
        <h1>Oops! You didn't add anything to the cart</h1>
        <p>Head back to the shop to keep Shopping!!!</p>
      </Jumbotron>
    </div>
  ) : (
    <div className="cart">
      {props.items.map((item, key) => (
        <div key={key} className="cartItem">
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="cartParent">
                    <div
                      className="cartImg"
                      style={{ backgroundImage: "url(" + item.url + ")" }}
                    ></div>
                  </div>
                </td>
                <td className="itemDetCart">
                  <h2 className="center">{item.name}</h2>
                  <h2 className="center">Rs {item.price * item.quantity}</h2>
                  <p className="cartp">
                    <b>Price: </b>
                    {item.price}
                  </p>
                  <p className="cartp">
                    <b>Quantity:</b> {item.quantity}
                  </p>
                  <p className="cartp">
                    <b>Quantity left: </b>
                    {item.allowedQuantity - item.quantity}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div className="cartItem">
        <Link to="/pay">
          <Button size="lg" variant="info">
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
