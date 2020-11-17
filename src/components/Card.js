import React, { useState } from "react";
export default function Card(props) {
  let card = props.card;
  const [edit, setEdit] = useState(false);
  const [cardDet, setCard] = useState(card);
  console.log(props);

  return (
    <div className="cartItem">
      <img src={card.card_img} />
      <h1>{card.card_name}</h1>
      <h2>{card.income_range}</h2>
      <button onClick={() => setEdit(true)}>Edit</button>
      <input
        name="card_name"
        value={cardDet.card_name}
        onChange={(e) =>
          setCard({ ...cardDet, [e.target.name]: e.target.value })
        }
      />
      <input
        name="income_range"
        value={cardDet.income_range}
        onChange={(e) =>
          setCard({ ...cardDet, [e.target.name]: e.target.value })
        }
      />
    </div>
  );
}
