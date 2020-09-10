import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Shop from "./components/Shop";

function App() {
  return (
    <div>
      <Shop />
      {/* <Router>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand>Some dope Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/home" exact component={LandingPage} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/profile" exact component={Profile} />
      </Router> */}
    </div>
  );
}

export default App;
