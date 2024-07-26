// components/Footer.tsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#13392c] text-white py-4 px-4">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Email Subscription Section */}
        <div className="col-span-2 pr-28">
          <div className="text-2xl font-semibold mb-4 ">
            Enter Your Email Address To Get $20 Off Your First Order
          </div>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 w-[80%] border border-gray-300 rounded-md"
            />
            <button className="p-2 bg-white text-black rounded-md ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

        {/* My Account Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 ">My Account</h3>
          <ul className="text-sm text-[#cccccc]">
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
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="text-sm text-[#cccccc]">
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
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
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
      <div className="w-full h-[1px] bg-white bg-opacity-20 mt-8"></div>
      <div className="w-full flex-center">
        <div className="flex justify-between w-[50%] pt-4 text-sm text-[#cccccc]">
          <div>About us</div>
          <div>Faq</div>
          <div>Privacy policy</div>
          <div>Return & Exchange</div>
          <div>Terms & Condition</div>
          <div>Shipping policy</div>
        </div>
      </div>
      <div className="text-sm text-[#cccccc]">
        © 2024, Grotto-theme Powered by Shopify
      </div>
    </div>
  );
};

export default Footer;
