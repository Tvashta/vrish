import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [res, setRes] = useState({});
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/userGender").then(function (res) {
          let st = {};
          res.data.map((x) => {
            st = {
              ...st,
              [x.state]: [],
            };
            return null;
          });
          res.data.map((x) => st[x.state].push({ [x.sex]: x.count }));
          setRes(st);
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
  return <div>hey</div>;
}
