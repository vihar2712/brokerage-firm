import React, { useEffect, useState } from "react";
import { DUMMY_DATA } from "../utils/constants";
import FullCard from "./FullCard";
import Card from "./Card";
import Header from "./Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user);
  const navigate = useNavigate();
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // const uid = user.uid;
        dispatch(
          addUser({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
        navigate("/home");
      } else {
        // User is signed out
        navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="flex ">
        <div className="border-r-2 border-gray-200 py-14 px-6 mx-[250px] ">
          <h1 className="text-3xl mb-4">Welcome, {userInfo?.displayName} </h1>
          {cardList.map((card, index) => (
            <Card
              key={card.title}
              card={card}
              index={index}
              handleClick={handleClick}
              bgColor={bgColor}
            />
          ))}
        </div>
        {fullCard && <FullCard fullCard={fullCard} />}
      </div>
    </div>
  );
};

export default Home;
