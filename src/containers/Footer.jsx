import React from "react";
import Logo from "../assets/img/logo.jpg";
import { Link } from "react-router-dom";
import ContactUs from "../pages/Contactus";
const Footer = () => {
  return (
    <div className=" w-full flex items-center justify-between border-t border-gray-300">
      {/* Footer */}
      <div className="flex items-center justify-center gap-3 py-3">
        <img src={Logo} className="w-6 h-auto object-contain"></img>
        <p>Talentforge</p>
      </div>

      <div className="flex items-center justify-center gap-6">
        <Link to={"/"} className="text-blue-700 text-sm ">
          Home
        </Link>
        <Link to={"/contact"} className="text-blue-700 text-sm ">
          ContactUs
        </Link>
        {/* whitespace-nowrap  It ensures that the text remains on a single line, without any line breaks. */}
        <Link to={"/privacypolicy"} className="text-blue-700 text-sm whitespace-nowrap ">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
