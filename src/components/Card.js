import React from "react";
export default function Card(props) {
  let card = props.card;
  return (
    <div>
      <h1>{card.color}</h1>
    </div>
  );
}
