import React from "react";
import { FaChevronRight } from "react-icons/fa6";

//importing different auths
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const AuthButton = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githAuthProvider = new GithubAuthProvider();

  const handleClick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        await signInWithRedirect(auth, googleAuthProvider)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(`${err.Message}`);
          });
        break;

      case "GithubAuthProvider":
        await signInWithRedirect(auth, githAuthProvider)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(`${err.Message}`);
          });
        break;

      default:
        await signInWithRedirect(auth, googleAuthProvider)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(`${err.Message}`);
          });
        break;
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" w-full px-2 py-3 rounded-md border-2 border-blue-700 
        flex items-center justify-between cursor-pointer group hover:bg-blue-800 
        active:scale-75 duration-150 hover: shadow-md"
    >
      <Icon className="text-txtPrimary text-xl group-hover:text-white  " />

      <p className="text-txtPrimary text-xl group-hover:text-white  ">
        {label}
      </p>

      <FaChevronRight className="text-txtPrimary text-lg group-hover:text-white" />
    </div>
  );
};

export default AuthButton;
