import React from "react";
import { LOGO_URL } from "../utils/constants";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="border-r-2 border-gray-200 fixed h-full z-10 top-0 left-0">
      <img src={LOGO_URL} className="w-32 m-8 rounded-full" alt="logo" />
      <div className="px-14 text-gray-700">
        <h1>Opportunities</h1>
        <h1 className="my-1">My Profile</h1>
        <button className="hover:underline" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
