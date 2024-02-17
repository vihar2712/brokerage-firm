import React from "react";

const FullCard = ({ fullCard }) => {
  return (
    <div className=" my-10 p-5 border-2 border-gray-200 rounded-lg fixed h-fit z-10 right-10 w-6/12 font-semibold bg-gray-200">
      <img
        src={fullCard.logo}
        className="w-60 h-40 rounded-md float-right"
        alt={fullCard.title}
      />
      <h1 className="text-3xl font-bold mt-2">{fullCard.title}</h1>
      <h1 className="text-lg">Investment amount : {fullCard.amount}</h1>
      <p className="text-gray-700 mt-2">{fullCard.description}</p>
      <p className="text-red-700 mt-2">Risk factors: {fullCard.risk_factor}</p>
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
  );
};

export default FullCard;
