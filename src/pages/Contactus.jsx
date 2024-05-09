import React from "react";
import { Link } from "react-router-dom";
import sar_res from "../assets/img/sar_res.jpeg";
import suy_res from "../assets/img/suy_res.jpg";
import har_res from "../assets/img/har_res.png";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex items-center mb-8">
        <Link to="/auth" className="text-blue-500 hover:underline">
          &larr; Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Developer 1 */}
        <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
          <img
            src={sar_res}
            alt="Developer 1"
            className="w-48 h-48 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-semibold mb-2">Sarthak Verma</h2>
          <p className="text-gray-600 mb-2">Email: bt21cse012@nituk.ac.in</p>
          <p className="text-gray-600">Phone: +1234567890</p>
        </div>

        {/* Developer 2 */}
        <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
          <img
            src={suy_res}
            alt="Developer 2"
            className="w-48 h-48 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-semibold mb-2">Suyash Mishra</h2>
          <p className="text-gray-600 mb-2">Email: bt21cse019@nituk.ac.in</p>
          <p className="text-gray-600">Phone: +1234567890</p>
        </div>

        {/* Developer 3 */}
        <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
          <img
            src={har_res}
            alt="Developer 3"
            className="w-48 h-48 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-semibold mb-2">Harisharan</h2>
          <p className="text-gray-600 mb-2">Email: bt21cse016@nituk.ac.in</p>
          <p className="text-gray-600">Phone: +1234567890</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
