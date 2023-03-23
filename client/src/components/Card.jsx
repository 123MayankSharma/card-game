import { useState } from "react";
import "../components/Card.css"

const Card = ({ emoji, onClick,idx,flipped }) => {

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={()=>{onClick(idx)}}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "150px",
        height: "200px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        backgroundColor: "gray",
      }}
    >
    {flipped===true?<span className="emoji">{"🃏"}</span>:<span className="emoji">{emoji}</span>}
    </div>
  );
};

export default Card;
