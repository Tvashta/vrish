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
  const [isAdminAuthenticated, setAdminAuthentication] = useState(false);
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
    income_range: "",
  });
  const [card, openCard] = useState(null);
  const [items, setItems] = useState([]);

  function setDetails(e, f) {
    setUserDetails(e);
    let path = "http://localhost:4000/users/" + e.aadhar;
    axios
      .post("http://localhost:4000/users", e)
      .then(function (res) {
        axios
          .get(path)
          .then((res) => {
            f.map((x) => {
              let member = {
                aadhar: x.aadhar,
                name: x.name,
                dob: x.dob,
                sex: x.sex,
                user_id: res.data[0].user_id,
              };

              axios
                .post("http://localhost:4000/family", member)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            });
            let p = "http://localhost:4000/prodCard" + e.income_range;
            axios
              .get(p)
              .then((res) => setItems(res.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch(function (err) {
        console.log(err);
      });
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
          render={() => <LandingPage user={user} setItems={setItems} />}
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
        <Route
          path="/pay"
          render={() => <Pay cart={cart} total={total} user={user} />}
        />
        <Route path="/cards" render={() => <Cards card={openCard} />} />
        <Route path="/card" render={() => <Card card={card} />} />
        <Route path="/profile" render={() => <Profile userDet={user} />} />
        <Route path="/addCard" render={() => <AddCard />} />
        <Route path="/products" render={() => <Products />} />
        <Route path="/addProduct" render={() => <AddProduct />} />
      </BrowserRouter>
    </div>
  );
}

export default Main;
