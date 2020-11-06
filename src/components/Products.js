import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
export default function Products() {
  const [response, setResp] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/products").then(function (res) {
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
          <div className="card" key={i}>
            <img alt='prod' className="card-img" src={x.url} />
            <div className="overlay">
              <div className="card-details">
                <h1 className="card-p">{x.name}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/addProduct">
        <Fab className="fabBtn">
          <Add />
        </Fab>
      </Link>
    </div>
  );
}
