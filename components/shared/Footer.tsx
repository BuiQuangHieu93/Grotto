"use client";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleSection = (section: "account" | "service" | "contact") => {
    switch (section) {
      case "account":
        setShowAccount(!showAccount);
        break;
      case "service":
        setShowService(!showService);
        break;
      case "contact":
        setShowContact(!showContact);
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-[#13392c] text-white py-4 px-4">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 pt-10">
        {/* Email Subscription Section */}
        <div className="col-span-1 lg:col-span-2 lg:pr-28">
          <div className="text-xl lg:text-2xl font-semibold mb-4">
            Enter Your Email Address To Get $20 Off Your First Order
          </div>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 w-full md:w-[80%] border border-gray-300 rounded-md"
            />
            <button className="p-2 bg-white text-black rounded-md ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-4">
            <FaFacebookF className="w-8 h-8 p-2 bg-blue-600 rounded-full" />
            <FaInstagram className="w-8 h-8 p-2 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 rounded-full" />
            <FaTwitter className="w-8 h-8 p-2 bg-blue-400 rounded-full" />
            <FaPinterest className="w-8 h-8 p-2 bg-red-600 rounded-full" />
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="bg-[#13392c] p-6 text-white col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* My Account Section */}
          <div>
            <div className="flex justify-between items-center md:block">
              <h3 className="text-lg font-semibold mb-4">My Account</h3>
              <button
                className="md:hidden text-sm text-[#d3c3a4] hover:text-[#e1d1b1]"
                onClick={() => toggleSection("account")}
              >
                {showAccount ? "Hide" : "Show"}
              </button>
            </div>
            <ul
              className={`text-sm text-[#cccccc] ${
                showAccount ? "block" : "hidden"
              } md:block`}
            >
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  About us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  Faq
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  Privacy policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <div className="flex justify-between items-center md:block">
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <button
                className="md:hidden text-sm text-[#d3c3a4] hover:text-[#e1d1b1]"
                onClick={() => toggleSection("service")}
              >
                {showService ? "Hide" : "Show"}
              </button>
            </div>
            <ul
              className={`text-sm text-[#cccccc] ${
                showService ? "block" : "hidden"
              } md:block`}
            >
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  About us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  Faq
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  Privacy policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#d3c3a4]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <div className="flex justify-between items-center md:block">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <button
                className="md:hidden text-sm text-[#d3c3a4] hover:text-[#e1d1b1]"
                onClick={() => toggleSection("contact")}
              >
                {showContact ? "Hide" : "Show"}
              </button>
            </div>
            <div className={`${showContact ? "block" : "hidden"} md:block`}>
              <p className="mb-2 text-sm text-[#cccccc]">Hotline free 24/7:</p>
              <p className="font-bold mb-4 text-sm text-[#cccccc]">
                +01 0123 456 789
              </p>
              <p className="mb-2 text-sm text-[#cccccc]">
                <strong>Address:</strong> 1010-white street block, USA
              </p>
              <p className="mb-2 text-sm text-[#cccccc]">
                <strong>Email:</strong> admin@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-white bg-opacity-20 mt-8"></div>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center md:justify-between w-full md:w-[90%] lg:w-[50%] pt-4 text-sm text-[#cccccc]">
          <div className="w-1/2 sm:w-auto text-center py-2 px-2">About us</div>
          <div className="w-1/2 sm:w-auto text-center py-2 px-2">Faq</div>
          <div className="w-1/2 sm:w-auto text-center py-2 px-2">
            Privacy policy
          </div>
          <div className="w-1/2 sm:w-auto text-center py-2 px-2">
            Return & Exchange
          </div>
          <div className="w-1/2 sm:w-auto text-center py-2 px-2">
            Terms & Condition
          </div>
          <div className="w-1/2 sm:w-auto text-center py-2 px-2">
            Shipping policy
          </div>
        </div>
      </div>

      <div className="text-sm text-center text-[#cccccc] mt-4">
        © 2024, Grotto-theme Powered by Shopify
      </div>
    </div>
  );
};

export default Footer;
