import React, { useState } from "react";
import Cart from "./Cart";
import Register from "./Register";
import LandingPage from "./LandingPage";
import Shop from "./Shop";
import Pay from "./Pay";
import UserEntry from "./UserEntry";
import Admin from "./Admin";
import Cards from "./Cards";
import Card from "./Card";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Profile from "./Profile";
var admin = { id: "ad", pwd: "admin" };
function Main() {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [isUserAuthenticated, setUserAuthentication] = useState(true);
  const [user, setUserDetails] = useState({ username: "ad" });
  const [card, openCard] = useState(null);
  const items = [
    {
      id: 1,
      name: "Rice",
      url:
        "https://m.economictimes.com/thumb/msid-74822211,width-1200,height-900,resizemode-4,imgsize-258618/rice-agencies.jpg",
      added: false,
      quantity: 0,
      allowedQuantity: 5,
      qtyConsumed: 2,
      price: 60,
    },
    {
      id: 2,
      name: "Wheat",
      url:
        "https://images.newindianexpress.com/uploads/user/imagelibrary/2019/9/29/w900X450/Highs.jpg",
      added: false,
      quantity: 0,
      allowedQuantity: 2,
      qtyConsumed: 1,
      price: 50,
    },
    {
      id: 3,
      name: "Sugar",
      url:
        "https://sensorex.com/wp-content/uploads/2017/08/sugar-e1502291655515.jpg",
      added: false,
      quantity: 0,
      allowedQuantity: 2,
      qtyConsumed: 1,
      price: 40,
    },
    {
      id: 4,
      name: "Toor Daal",
      url:
        "https://cdn.shopify.com/s/files/1/1751/6601/products/Toor_Daal_1400x.jpg?v=1527359086",
      added: false,
      quantity: 0,
      allowedQuantity: 3,
      qtyConsumed: 0,
      price: 40,
    },
    {
      id: 5,
      name: "Cooking Oil",
      url:
        "https://m.economictimes.com/thumb/msid-72250379,width-1200,height-900,resizemode-4,imgsize-573232/cooking-oil.jpg",
      added: false,
      quantity: 0,
      allowedQuantity: 2,
      qtyConsumed: 0,
      price: 50,
    },
  ];

  function setDetails(e) {
    setUserDetails(e);
    console.log(e);
  }

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
        {isUserAuthenticated && user.username != "ad" && (
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
        )}
        {isUserAuthenticated && user.username == "ad" && (
          <Navbar className="navbar-bg" variant="dark">
            <Navbar.Brand href="#home">FPS</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cards">
                  <Nav.Link>Cards</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/fps">
                  <Nav.Link>FPS Shops</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
        <Route
          exact
          path="/"
          render={() => {
            return isUserAuthenticated ? (
              user.username == "ad" ? (
                <Redirect to="/adminHome" />
              ) : (
                <Redirect to="/home" />
              )
            ) : (
              <Redirect to="/register" />
            );
          }}
        />
        <Route path="/cart" render={() => <Cart items={cart} />} />
        <Route
          path="/register"
          render={() => (
            <Register
              setDetails={setDetails}
              userAuth={setUserAuthentication}
            />
          )}
        />
        <Route
          path="/home"
          render={() =>
            user.username == "ad" ? (
              <Redirect to="/adminHome" />
            ) : (
              <LandingPage user={user} items={items} />
            )
          }
        />
        <Route path="/adminHome" render={() => <Admin />} />
        <Route
          path="/shop"
          render={() => <Shop items={items} addItem={addItem} />}
        />
        <Route path="/pay" render={() => <Pay cart={cart} total={total} />} />
        <Route path="/cards" render={() => <Cards card={openCard} />} />
        <Route path="/card" render={() => <Card card={card} />} />
        <Route
          path="/userEntry"
          render={() => (
            <UserEntry
              user={user}
              setDetails={setDetails}
              userAuth={setUserAuthentication}
            />
          )}
        />
        <Route path="/profile" render={() => <Profile userDet={user} />} />
      </BrowserRouter>
    </div>
  );
}

export default Main;
