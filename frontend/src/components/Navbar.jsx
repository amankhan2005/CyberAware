 'use client';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-200 text-gray-600 text-sm py-2 px-6 flex justify-between items-center">
        <span className="animate-fade-in">{currentDate}</span>
      </div>

      {/* Logo & Social Media */}
      <div className="bg-white py-4 px-6 flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <span className="text-sky-600 text-3xl font-bold">CYBERAWARE</span>
          <span className="text-gray-600 font-semibold text-sm ml-2">
            Stay Secure, Stay Updated
          </span>
        </div>

        <div className="flex space-x-4 items-center">
          {[faFacebook, faXTwitter, faLinkedin, faGoogle].map((icon, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={icon} className="text-xl" />
            </a>
          ))}

          <a
            href="/login"
            className="bg-red-500 text-white font-semibold flex items-center py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faUserCircle} className="text-xl mr-2" /> Sign
            in
          </a>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-sky-400 text-white px-6 py-2 flex items-center justify-center">
        <div className="flex space-x-6">
          {["Home", "About", "Contact Us"].map((item, index) => (
            <a
              key={index}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-gray-300 font-semibold relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
