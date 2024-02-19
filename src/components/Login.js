import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { validateData } from "../utils/validateData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };
  const handleSubmit = () => {
    if (isSignUp) {
      const validationResult = validateData(
        email.current.value,
        password.current.value
      );
      if (!validationResult) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({
                    uid,
                    displayName,
                    email,
                  })
                );
              })
              .catch((error) => {
                // An error occurred
              });
            console.log(user);
            navigate("/home");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });
      } else {
        setErrorMessage(validationResult);
      }
    } else {
      const validationResult = validateData(email.current.value);
      if (!validationResult) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home");
            // ...
          })
          .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            setErrorMessage("Invalid email or password..");
          });
      } else {
        setErrorMessage(validationResult);
      }
    }
  };

  return (
    <div>
      <img
        src={BG_IMAGE_URL}
        className="fixed top-0 left-0 w-screen h-screen"
      />
      <div className="p-10 m-4 w-11/12 sm:w-5/12 lg:w-3/12 relative top-48 rounded-md mx-auto">
        <h1 className="text-3xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Log In"} Form
        </h1>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {isSignUp && (
            <input
              ref={name}
              placeholder="Enter your name"
              className="mt-4 p-2 rounded-sm"
              type="text"
              required
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Enter your email"
            className=" my-4 p-2 rounded-sm"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter your password"
            className=" p-2 rounded-sm"
          />
          <button className=" my-4 mx-auto w-full p-2 rounded-md bg-white hover:bg-gray-200">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
          <button className="hover:underline text-center w-full" onClick={handleSignUp}>
            {isSignUp ? "Already a user? Log In" : "New here? Sign Up"}
          </button>
        {errorMessage && (
          <h1 className="text-red-600 text-center">{errorMessage}</h1>
        )}
      </div>
    </div>
  );
};

export default Login;
