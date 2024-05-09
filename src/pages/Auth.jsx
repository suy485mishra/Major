import React, { useEffect } from "react";
import Logo from "../assets/img/logo.jpg";
import { Footer } from "../containers";
import { AuthButton, MainSpinner } from "../components";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { data, isLoading, isError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="auth-section flex min-h-screen flex-col justify-between bg-gradient-to-r from-blue-300 to-sky-200">
      <div className="container mt-24 mx-auto max-w-md px-4 py-12 bg-white rounded-lg shadow-md ">
        <img src={Logo} alt="logo" className="w-20 h-auto mx-auto mb-8" />

        <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-700">
          Welcome to Talentforge
        </h1>
        <p className="text-xl text-center text-gray-600">
          Crafting Resumes, Building Futures
        </p>
        <br/>
        <h2 className="text-xl text-center text-gray-600 mb-4">Authenticate</h2>

        <div className="flex flex-col space-y-4">
          <AuthButton Icon={FaGoogle} label={"Sign in with Google"} provider={"GoogleAuthProvider"} />
          <AuthButton Icon={FaGithub} label={"Sign in with Github"} provider={"GithubAuthProvider"} />
        </div>
      </div>

      <Footer className="mt-8" />
    </div>
  );
};

export default Auth;
