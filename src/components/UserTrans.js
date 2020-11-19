import React, { useState, useEffect } from "react";
import axios from "axios";

function UserTrans(props) {
  const [res, setResp] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        let path = "http://localhost:4000/trans/" + props.userid;
        axios.get(path).then(function (res) {
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
  }, [props.userid]);
  return (
    <div className="cartItem">
      <table className="trans">
        <thead>
          <tr>
            <td>Sno</td>
            <td>Date/Time of Transaction</td>
            <td>Amount [In Rs]</td>
          </tr>
        </thead>
        <tbody>
          {res.map((x, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{new Date(Date.parse(x.date)).toLocaleString()}</td>
              <td>{x.amt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTrans;
