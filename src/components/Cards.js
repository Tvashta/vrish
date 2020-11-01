import React from "react";
import { Link } from "react-router-dom";
export default function Cards(props) {
  let cards = [
    {
      color: "White",
      range: "50 Lakh +",
      img:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cloud-nine-paint-1554223784.jpg?crop=0.380xw:0.335xh;0.303xw,0.320xh&resize=480:*",
    },
    {
      color: "Green",
      range: "10-50 Lakhs",
      img:
        "https://knottooshabby.net/wp-content/uploads/2016/08/Chalk-Paint-blob-Amsterdam-Green-525x525-1.jpg",
    },
    {
      color: "Brown",
      range: "5-10 Lakhs",
      img:
        "https://media.benjaminmoore.com/WebServices/prod/dollops/360x360/2107-10.png",
    },
  ];
  return (
    <div>
      {cards.map((x, i) => (
        <div key={i} onClick={() => props.card(cards[i])}>
          <Link to="/card">
            <img src={x.img} />
            <h1>{x.color}</h1>
            <h2>{x.range}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
