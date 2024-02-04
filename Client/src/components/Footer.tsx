import React from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:justify-between">
          <div className="text-center">
            <p className="text-base text-gray-400">
              &copy; 2024 Alejandra's Furniture, Inc. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              {/* <FaFacebookF /> */}
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              {/* <FaInstagram /> */}
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              {/* <FaTwitter /> */}
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              {/* <FaLinkedinIn /> */}
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">YouTube</span>
              {/* <FaYoutube /> */}
            </a>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Facebook
            </a>
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Instagram
            </a>
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Jobs
            </a>
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Contact
            </a>
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Accessibility
            </a>
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Partners
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
