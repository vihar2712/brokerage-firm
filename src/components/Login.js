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

const Login = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="p-4 m-4 w-3/12 bg-gray-200 rounded-md mx-auto">
      <h1 className="text-xl font-bold text-center">
        {isSignUp ? "Sign Up" : "Log In"} Form
      </h1>
      <form className="flex flex-col">
        {isSignUp && (
          <input
            ref={name}
            placeholder="Enter your name"
            className="border-2 border-black mt-4 p-2 rounded-sm"
            type="text"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Enter your email"
          className="border-2 border-black my-4 p-2 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="Enter your password"
          className="border-2 border-black p-2 rounded-sm"
        />
        <button
          className="bg-gray-300 my-2 w-fit mx-auto p-2 rounded-md hover:bg-gray-500"
          onClick={handleSubmit}
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
        <button className="hover:underline" onClick={handleSignUp}>
          {isSignUp ? "Already a user? Log In" : "New here? Sign Up"}
        </button>
      </form>
      {errorMessage && <h1 className="text-red-600">{errorMessage}</h1>}
    </div>
  );
};

export default Login;
