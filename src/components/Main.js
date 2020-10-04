import React, { useState } from "react";
import Product from "./Product";
import Cart from "./Cart";
import LandingPage from "./LandingPage";
import Shop from "./Shop";
import Pay from "./Pay";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Profile from "./Profile";

function Main() {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [isUserAuthenticated, setUserAuthentication] = useState(true);
  const items = [
    {
      id: 1,
      name: "Rice",
      url:
        "https://m.economictimes.com/thumb/msid-74822211,width-1200,height-900,resizemode-4,imgsize-258618/rice-agencies.jpg",
      added: false,
      quantity: 0,
      allowedQuantity: 5,
      qtyConsumed: 0,
      price: 10,
    },
    {
      id: 2,
      name: "Wheat",
      url:
        "https://images.newindianexpress.com/uploads/user/imagelibrary/2019/9/29/w900X450/Highs.jpg",
      added: false,
      quantity: 0,
      allowedQuantity: 2,
      qtyConsumed: 0,
      price: 20,
    },
  ];

  function addItem(item) {
    if (item.quantity === 0) item.quantity = 1;
    let f = 0;
    let t = 0;
    cart.map((c) => {
      if (c.id === item.id) {
        c.quantity += item.quantity;
        c.quantity = Math.min(c.quantity, c.allowedQuantity);
        f = 1;
      }
      t += c.quantity * c.price;
    });
    if (f === 0) {
      cart.push(item);
      t += item.quantity * item.price;
    }
    setTotal(t);
    setCart(cart);
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar className="navbar-bg" variant="dark">
          <Navbar.Brand href="#home">FPS</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <ShoppingCartIcon />
                  Rs {total}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route
          exact
          path="/"
          render={() => {
            return isUserAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route path="/cart" render={() => <Cart items={cart} />} />
        <Route path="/profile" render={Profile} />
        <Route path="/home" render={LandingPage} />
        <Route
          path="/shop"
          render={() => <Shop items={items} addItem={addItem} />}
        />
        <Route path="/pay" render={() => <Pay cart={cart} total={total} />} />
      </BrowserRouter>
    </div>
  );
}

export default Main;
