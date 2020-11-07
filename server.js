const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 4000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "FPS",
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to DB");
});

const app = express();
app.use(cors());
app.use(express.json());

app
  .route("/cardCat")
  .get((req, res) => {
    let sql = "SELECT * from Card_category";
    let query = db.query(sql, (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  })
  .post((req, res) => {
    let card = req.body;
    let sql = "INSERT INTO Card_Category SET ?";
    db.query(sql, card, (err, results) => {
      if (err) console.log(err);
      else res.json("Card Added");
    });
  });

app
  .route("/users")
  .post((req, res) => {
    let user = req.body;
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, user, (err, results) => {
      if (err) console.log(err);
      else res.json("User added");
    });
  })
  .get((req, res) => {
    let sql = "SELECT * from Users";
    let query = db.query(sql, (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  });

app.get("/users/:aadhar", (req, res) => {
  let sql = "SELECT user_id from users where aadhar=" + req.params.aadhar;
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.get("/username/:uname", (req, res) => {
  let sql = "SELECT * from users where username='" + req.params.uname + "'";
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app
  .route("/products")
  .get((req, res) => {
    let sql = "SELECT * from Products";
    let query = db.query(sql, (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  })
  .post((req, res) => {
    let products = req.body;
    let sql = "INSERT INTO Products SET ?";
    let query = db.query(sql, products, (err, results) => {
      if (err) console.log(err);
      else res.json("Product added");
    });
  });

app
  .route("/prodCard")
  .get((req, res) => {
    let sql = "SELECT * from Prod_for_Cards";
    let query = db.query(sql, (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  })
  .post((req, res) => {
    let products = req.body;
    let sql = "INSERT INTO Prod_for_Cards SET ?";
    let query = db.query(sql, products, (err, results) => {
      if (err) console.log(err);
      else res.json("Product added to Card");
    });
  });

app.get("/prodCard/:income", (req, res) => {
  let sql =
    "SELECT * from prod_for_cards where income_range= '" +
    req.params.income +
    "'";
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.route("/family").post((req, res) => {
  let family = req.body;
  let sql = "INSERT INTO family SET ?";
  db.query(sql, family, (err, results) => {
    if (err) console.log(err);
    else res.json("Family member added!");
  });
});

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
