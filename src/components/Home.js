import React, { useEffect, useState } from "react";
import { BG_IMAGE_URL, DUMMY_DATA } from "../utils/constants";
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
      <img
        src={BG_IMAGE_URL}
        className="fixed top-0 left-0 w-screen h-screen -z-10"
      />
      <div className="flex">
        <div className="py-14 px-6 mx-[250px] ">
          <h1 className="text-3xl mb-4 mx-2 bg-white p-2 text-center rounded-md">Welcome, {userInfo?.displayName} </h1>
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
