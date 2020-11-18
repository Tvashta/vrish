const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 4000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "FPS",
  multipleStatements: true,
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
    "SELECT pc.id, qty, price, income_range, prod_id, name, url FROM prod_for_cards pc, products p where income_range= '" +
    req.params.income +
    "' and p.id=pc.prod_id ;";
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.route("/prodUser").post((req, res) => {
  let prod = req.body;
  let sql = "INSERT INTO Prod_left SET ?";
  db.query(sql, prod, (err, results) => {
    if (err) console.log(err);
    else res.json("Product User added!");
  });
});

app
  .route("/prodUser/:id")
  .get((req, res) => {
    let sql =
      "SELECT pl.prod_id, pl.qty, name, url, price FROM prod_left pl, products p, prod_for_cards pc, users u  where pl.user_id= '" +
      req.params.id +
      "' and p.id=pl.prod_id and pc.income_range=u.income_range and u.user_id=pl.user_id and p.id=pc.prod_id";
    let query = db.query(sql, (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  })
  .post((req, res) => {
    console.log(req.body);
    if (req.body.qty <= 0) {
      let sql = `DELETE FROM Prod_left where user_id=${req.params.id} and prod_id = (SELECT id from Products p where p.name= '${req.body.name}')`;
      db.query(sql, (err, results) => {
        if (err) console.log(err);
        else res.json("Updated!");
      });
    } else {
      let sql = `UPDATE Prod_left SET qty = ${req.body.qty} where user_id=${req.params.id} and prod_id = (SELECT id from Products p where p.name= '${req.body.name}')`;
      db.query(sql, (err, results) => {
        if (err) console.log(err);
        else res.json("Updated!");
      });
    }
  });

app.get("/prodCons/:id", (req, res) => {
  let sql =
    "SELECT round((pc.qty-pl.qty)*100/pc.qty, 2) as pcons, pl.prod_id, name, url from Prod_Left pl,Prod_for_cards pc, Products p where pc.prod_id=pl.prod_id and p.id=pc.prod_id and pl.user_id=" +
    req.params.id;
  db.query(sql, (err, results) => {
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

app
  .route("/trans")
  .get((req, res) => {
    let sql = "SELECT * from Transactions";
    let query = db.query(sql, (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  })
  .post((req, res) => {
    let trans = req.body;
    let sql = "INSERT INTO Transactions SET ?";
    let query = db.query(sql, trans, (err, results) => {
      if (err) console.log(err);
      else res.json("Transaction added");
    });
  });

app.get("/trans/:id", (req, res) => {
  let sql = "SELECT * from Transactions where user_id=" + req.params.id;
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

//User Stats

app.get("/userCity", (req, res) => {
  let sql =
    "select v1.count+ ifnull(v2.count, 0) as count, v1.city, v1.state from userCity v1 left join famCity v2 on v1.city=v2.city;";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.get("/userGender", (req, res) => {
  let sql =
    "select v1.count+ ifnull(v2.count, 0) as count, v1.sex as sex, v1.state as state from v1 left join v2 on v1.state=v2.state and v1.sex=v2.sex; ";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.get("/userCard", (req, res) => {
  let sql =
    "select count(f.aadhar)+1 as count, income_range from family f, users u where f.user_id=u.user_id group by income_range";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

// Amount Stats
app.get("/timeRev", (req, res) => {
  let sql =
    "SELECT SUM(CASE WHEN HOUR(`date`) BETWEEN 6 AND 12 THEN amt ELSE 0 END) AS `Morning`, SUM(CASE WHEN HOUR(`date`) BETWEEN 12 AND 18 THEN amt ELSE 0 END) AS `Afternoon`, SUM(CASE WHEN HOUR(`date`) < 6 OR HOUR(`date`) > 18 THEN amt ELSE 0 END) AS `Evening` FROM  transactions;";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.get("/timeCount", (req, res) => {
  let sql =
    "SELECT SUM(CASE WHEN HOUR(`date`) BETWEEN 6 AND 12 THEN 1 ELSE 0 END) AS `Morning`, SUM(CASE WHEN HOUR(`date`) BETWEEN 12 AND 18 THEN 1 ELSE 0 END) AS `Afternoon`, SUM(CASE WHEN HOUR(`date`) < 6 OR HOUR(`date`) > 18 THEN 1 ELSE 0 END) AS `Evening` FROM  transactions;";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});
app.get("/stateRev", (req, res) => {
  let sql =
    "Select state, max(amt) as max, min(amt) as min, sum(amt) as sum, avg(amt) as avg from Users u join transactions t on u.user_id=t.user_id group by state;";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

app.post("/refill", (req, res) => {
  let sql =
    "delete from prod_left; ALTER TABLE prod_left AUTO_INCREMENT = 1; insert into prod_left (user_id, prod_id,qty) select u.user_id, prod_id, qty from users u join prod_for_cards pc where u.income_range= pc.income_range;";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json("Refilled");
  });
});

app.post("/refillCard", (req, res) => {
  let sql = `delete from prod_left where user_id in (Select u.user_id from users u join prod_for_cards pc on u.income_range=pc.income_range and pc.income_range='${req.body.income_range}'); insert into prod_left (user_id, prod_id,qty) select u.user_id, prod_id, qty from users u join prod_for_cards pc where u.income_range= pc.income_range and pc.income_range='${req.body.income_range}';`;
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else res.json(`Refilled for ${req.body.id}`);
  });
});
app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
