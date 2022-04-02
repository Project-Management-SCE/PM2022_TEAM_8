import React from "react";
import "../Style/movieCard.css";
const MovieCard = () => {
  const img4: string = require("../assets/img/img4.jpg");

  return (
    <div className="card">
      <img src={img4} alt={img4} />
      <h3>Movie Name</h3>
      <p>This is the description of the fucking movie.....</p>
    </div>
  );
};

export default MovieCard;
