import React, { useEffect, useState } from "react";
import { DUMMY_DATA } from "../utils/constants";
const Body = () => {
  const [cardList, setCardList] = useState([]);
  const [fullCard, setFullCard] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(DUMMY_DATA);
    const json = await data.json();
    setCardList(json);
  };

  const handleClick = (clickedCard, cardIndex) => {
    setFullCard(clickedCard);
    setBgColor(cardIndex);
  };
  return (
    <div className="flex ">
      <div className="border-r-2 border-gray-200 py-14 px-6 mx-[250px] ">
        <h1 className="text-3xl mb-4">Welcome, user name</h1>
        {cardList.map((card, index) => (
          <div
            key={card.title}
            className={
              "rounded-md p-5 m-2 border-gray-200 border-2 hover:bg-gray-200 flex justify-between " +
              (bgColor === index ? "bg-gray-200" : "")
            }
          >
            <h1 className="text-xl font-semibold mr-4">{card.title}</h1>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => handleClick(card, index)}
            >
              Details
            </button>
          </div>
        ))}
      </div>
      {fullCard && (
        <div className=" my-10 p-5 border-2 border-gray-200 rounded-lg fixed h-fit z-10 right-10 w-6/12 font-semibold bg-gray-200">
          <img
            src={fullCard.logo}
            className="w-60 h-40 rounded-md float-right"
            alt={fullCard.title}
          />
          <h1 className="text-3xl font-bold mt-2">{fullCard.title}</h1>
          <h1 className="text-lg">Investment amount : {fullCard.amount}</h1>
          <p className="text-gray-700 mt-2">{fullCard.description}</p>
          <p className="text-red-700 mt-2">
            Risk factors: {fullCard.risk_factor}
          </p>
          <p className="text-green-700 mt-2">Strengths: {fullCard.strengths}</p>
          <p className="mt-2">Guidelines: {fullCard.guidelines}</p>
          <h1 className="mt-2 font-bold text-lg">
            Due date: {fullCard.due_date.toString()}
          </h1>
          <ul className="mt-2">
            Terms & conditions:
            <li>{fullCard.terms_and_conditions}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Body;
