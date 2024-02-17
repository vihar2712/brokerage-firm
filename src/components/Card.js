import React from "react";

const Card = ({ card, index, handleClick, bgColor }) => {
  const showDetails = () => {
    handleClick(card, index);
  };
  return (
    <div
      key={card.title}
      className={
        "rounded-md p-5 m-2 border-gray-200 border-2 hover:bg-gray-200 flex justify-between " +
        (bgColor === index ? "bg-gray-200" : "")
      }
    >
      <h1 className="text-xl font-semibold mr-4">{card.title}</h1>
      <button className="text-blue-600 hover:underline" onClick={showDetails}>
        Details
      </button>
    </div>
  );
};

export default Card;
