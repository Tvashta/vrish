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
import Transaction from "./Transaction";
import Contact from "./Contact";

import Admin from "./Admin";
import Cards from "./Cards";
import Card from "./Card";
import AdminLogin from "./AdminLogin";
import AddCard from "./AddCard";
import Products from "./Products";
import AddProduct from "./AddProduct";
import UserTrans from "./UserTrans";
import Gender from "./Gender";
import UserStats from "./UserStats";
import Revenue from "./Revenue";

function Main() {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [cardName, setCardName] = useState("");
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
    income_range: "",
  });
  const [card, openCard] = useState(null);
  const [items, setItems] = useState([]);

  function setDetails(e, f, l) {
    setUserDetails(e);
    if (l) {
      let path = "http://localhost:4000/users/" + e.aadhar;
      axios
        .post("http://localhost:4000/users", e)
        .then(function (res) {
          axios
            .get(path)
            .then((res) => {
              setUserDetails({ ...e, user_id: res.data[0].user_id });
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
                return null;
              });
              let p = "http://localhost:4000/prodCard/" + e.income_range;
              axios
                .get(p)
                .then((res1) => {
                  res1.data.map((x) => {
                    let prodUser = {
                      user_id: res.data[0].user_id,
                      prod_id: x.prod_id,
                      qty: x.qty,
                    };
                    axios
                      .post("http://localhost:4000/prodUser", prodUser)
                      .then((res) => console.log(res))
                      .catch((err) => console.log(err));
                    return null;
                  });
                  setItems(res1.data);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      let path = "http://localhost:4000/prodUser/" + e.user_id;
      axios
        .get(path)
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
    }
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
      return null;
    });
    if (f === 0) {
      cart.push(item);
      t += item.quantity * item.price;
    }
    setTotal(t);
    setCart(cart);
  }

  function cardDetails(cdetails) {
    setCardName(cdetails.cname);
    if (cdetails.cname === "") {
      setCardName(user.uname);
    }

    var d = new Date();
    var datetime =
      d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0];
    let trans = {
      user_id: user.user_id,
      amt: total,
      date: datetime,
    };
    axios
      .post("http://localhost:4000/trans", trans)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    cart.map((x) => {
      let path = "http://localhost:4000/prodUser/" + user.user_id;
      let y = { qty: x.allowedQuantity - x.quantity, name: x.name };

      axios
        .post(path, y)
        .then((res) => {
          let path = "http://localhost:4000/prodUser/" + user.user_id;
          axios
            .get(path)
            .then((res) => {
              setItems(res.data);
              setCart([]);
              setTotal(0);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      return null;
    });
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

        <Route path="/cards" render={() => <Cards card={openCard} />} />
        <Route path="/card" render={() => <Card card={card} />} />
        <Route
          path="/profile"
          render={() => (
            <Profile
              userDet={user}
              userAuth={setUserAuthentication}
              adminAuth={setAdminAuthentication}
              setUser={setUserDetails}
            />
          )}
        />
        <Route path="/addCard" render={() => <AddCard />} />
        <Route path="/products" render={() => <Products />} />
        <Route path="/addProduct" render={() => <AddProduct />} />
        <Route path="/Connect" render={() => <Contact />} />
        <Route
          path="/User_transactions"
          render={() => <UserTrans userid={user.user_id} />}
        />
        <Route path="/gender" render={() => <Gender />} />

        <Route path="/userStats" render={() => <UserStats />} />
        <Route path="/revenue" render={() => <Revenue />} />

        <Route
          path="/pay"
          render={() => (
            <Pay
              cart={cart}
              total={total}
              user={user}
              cardDetails={cardDetails}
            />
          )}
        />

        <Route
          path="/Transaction"
          render={() => <Transaction cardName={cardName} />}
        />
      </BrowserRouter>
    </div>
  );
}

export default Main;
