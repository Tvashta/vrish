import React from "react";

function Transaction(props) {
  const { cardName } = props;
  return (
    <div className="cartItem">
      <h1 className="center">Transaction Successful</h1>
      <p className="center">Name:{cardName}</p>
    </div>
  );
}

export default Transaction;
