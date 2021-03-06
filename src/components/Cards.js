import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
export default function Cards(props) {
  const [response, setResp] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/cardCat").then(function (res) {
          console.log(res.data);
          setResp(res.data);
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <div>
      <div className="cards">
        {response.map((x, i) => (
          <div className="card" key={i} onClick={() => props.card(x)}>
            <Link to="/card">
              <img alt='card' className="card-img" src={x.card_img} />
              <div className="overlay">
                <div className="card-details">
                  <h1 className="card-p">{x.card_name}</h1>
                  <h2 className="card-p">{x.income_range}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/addCard">
        <Fab className="fabBtn">
          <Add />
        </Fab>
      </Link>
    </div>
  );
}
