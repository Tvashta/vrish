import React, { useState } from "react";
import Product from "./Product";
import { Navbar, Nav } from "react-bootstrap";
function Shop() {
  const [items, setItems] = useState([
    {
      name: "test",
      url:
        "https://m.economictimes.com/thumb/msid-74822211,width-1200,height-900,resizemode-4,imgsize-258618/rice-agencies.jpg",
      added: false,
      quantity: 0,
      price: 10,
    },
    {
      name: "test2",
      url:
        "https://images.newindianexpress.com/uploads/user/imagelibrary/2019/9/29/w900X450/Highs.jpg",
      added: false,
      quantity: 0,
      price: 20,
    },
  ]);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Your FPS</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Profile</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
      <div className="items">
        {items.map((item, key) => (
          <Product
            key={key}
            name={item.name}
            url={item.url}
            added={item.added}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
