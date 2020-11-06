import React from "react";
export default function Card(props) {
  let card = props.card;
  console.log(props);
  return <div>{card.card_name}</div>;
}
