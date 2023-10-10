import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 sticky -top-1 z-10">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 lg:flex lg:justify-between items-center">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={handleMobileMenuClick}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className={`block h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h1 className="text-[#f56565] font-bold text-2xl   absolute left-[33vw]">
              <Link to={"/"}>TechRadar</Link>
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-start">
            <Link to={"/"}>
              <div className="flex-shrink-0 flex gap-2 cursor-pointer">
                <img
                  className="block mr-2 lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />

                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <h1 className="text-[#f56565] font-bold text-2xl hidden lg:block">
                  TechRadar
                </h1>
              </div>
            </Link>
            <div className="hidden  top-3 sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  to="/"
                  className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/business"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  Business
                </Link>
                <Link
                  to="/technology"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md textmd font-medium"
                >
                  Technology
                </Link>
                <Link
                  to="/entertainment"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  Entertainment
                </Link>
                <Link
                  to="/science"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  Science
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div
          className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link
              to="/"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/business"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Business
            </Link>
            <Link
              to="/technology"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Technology
            </Link>
            <Link
              to="/entertainment"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Entertainment
            </Link>
            <Link
              to="/science" 
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Science
            </Link>
            <button className="bg-gray-900 text-white px-3 py-2 block mb-1 rounded-md text-sm font-medium">
              Log in
            </button>
            <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
              Sign up
            </button>
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-2">
          <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
            Log in
          </button>
          <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
