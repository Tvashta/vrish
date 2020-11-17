import React, { useState, useEffect } from "react";
import axios from "axios";
import gender from "../images/gender.jpg";
import user from "../images/users.jpg";
import revenue from "../images/revenue.png";
import refill from "../images/refill.jpg";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="adminDash">
      <Link to="/gender">
        <button className="imgbtn">
          <img src={gender} />
          Gender
        </button>
      </Link>
      <Link to="/userStats">
        <button className="imgbtn">
          <img src={user} />
          User Stats
        </button>
      </Link>
      <Link to="/revenue">
        <button className="imgbtn">
          <img src={revenue} />
          Revenue
        </button>
      </Link>
      <button className="imgbtn">
        <img src={refill} />
        Refill Products
      </button>
    </div>
  );
}
