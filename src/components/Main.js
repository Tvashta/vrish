import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";

import Cart from "./Cart";
import Register from "./Register";
import LandingPage from "./LandingPage";
import Shop from "./Shop";
import Pay from "./Pay";
import Profile from "./Profile";
import UserEntry from "./UserEntry";

import Admin from "./Admin";
import Cards from "./Cards";
import Card from "./Card";
import AdminLogin from "./AdminLogin";
import AddCard from "./AddCard";
import Products from "./Products";
import AddProduct from "./AddProduct";
function Main() {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [isUserAuthenticated, setUserAuthentication] = useState(false);
  const [isAdminAuthenticated, setAdminAuthentication] = useState(true);
  const [user, setUserDetails] = useState({
    uname: "",
    username: "",
    ph_no: "",
    aadhar: "",
    email: "",
    addr1: "",
    city: "",
    state: "",
    sex: "",
  });
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
    setUserDetails({
      uname: user.uname,
      username: user.username,
      ph_no: user.ph_no.toString(),
      aadhar: user.aadhar,
      email: user.email,
      addr1: user.addr1,
      city: user.city,
      state: user.state,
      sex: user.sex,
    });
    isUserAuthenticated &&
      axios
        .post("http://localhost:4000/users", user)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
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
        {isUserAuthenticated ? (
          <nav className="navbar navbar-light navbar-expand-md">
            <div className="container-fluid">
              <p className="navbar-brand"></p>
              <button
                data-toggle="collapse"
                className="navbar-toggler"
                data-target="#navcol-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav mx-auto">
                  <LinkContainer to="/shop">
                    <Nav.Link>Shop</Nav.Link>
                  </LinkContainer>
                  <li className="nav-item">
                    <LinkContainer to="/profile">
                      <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li className="nav-item">
                    <LinkContainer to="/">
                      <Nav.Link>Statistics</Nav.Link>
                    </LinkContainer>
                  </li>
                </ul>
                <ul className="nav navbar-nav">
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <ShoppingCartIcon />
                      Rs {total}
                    </Nav.Link>
                  </LinkContainer>
                  <li className="nav-item">
                    <LinkContainer to="/register">
                      <button
                        onClick={() => {
                          setUserAuthentication(false);
                          setAdminAuthentication(false);
                        }}
                        className="btn btn-outline-dark border-dark logout"
                        type="button"
                      >
                        Logout
                      </button>
                    </LinkContainer>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          isAdminAuthenticated && (
            <nav className="navbar navbar-light navbar-expand-md">
              <div className="container-fluid">
                <p className="navbar-brand"></p>
                <button
                  data-toggle="collapse"
                  className="navbar-toggler"
                  data-target="#navcol-1"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                  <ul className="nav navbar-nav mx-auto">
                    <li className="nav-item">
                      <LinkContainer to="/cards">
                        <Nav.Link>Cards</Nav.Link>
                      </LinkContainer>
                    </li>
                    <li className="nav-item">
                      <LinkContainer to="/adminHome">
                        <Nav.Link>Home</Nav.Link>
                      </LinkContainer>
                    </li>
                    <li className="nav-item">
                      <LinkContainer to="/products">
                        <Nav.Link>Products</Nav.Link>
                      </LinkContainer>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav">
                    <li className="nav-item">
                      <LinkContainer to="/register">
                        <button
                          onClick={() => {
                            setUserAuthentication(false);
                            setAdminAuthentication(false);
                          }}
                          className="btn btn-outline-dark border-dark logout"
                          type="button"
                        >
                          Logout
                        </button>
                      </LinkContainer>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          )
        )}

        <Route
          exact
          path="/"
          render={() => {
            return isUserAuthenticated ? (
              <Redirect to="/home" />
            ) : isAdminAuthenticated ? (
              <Redirect to="/adminHome" />
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
          render={() => <LandingPage user={user} items={items} />}
        />
        <Route path="/adminHome" render={() => <Admin />} />
        <Route
          path="/adminLogin"
          render={() => <AdminLogin adminAuth={setAdminAuthentication} />}
        />
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
        <Route path="/addCard" render={() => <AddCard />} />
        <Route path="/products" render={() => <Products />} />
        <Route path="/addProduct" render={() => <AddProduct />} />
      </BrowserRouter>
    </div>
  );
}

export default Main;
