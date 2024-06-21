import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium";
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-10">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
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
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
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
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="hidden sm:flex flex-shrink-0 items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <h1 className="text-[#f56565] font-bold text-2xl ml-2 hidden lg:block">
                TechRadar
              </h1>
            </Link>
            <h1 className="text-[#f56565] font-bold text-2xl absolute left-1/2 transform -translate-x-1/2 sm:hidden">
              <Link to="/">TechRadar</Link>
            </h1>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link to="/business" className={getLinkClasses("/business")}>
                Business
              </Link>
              <Link to="/technology" className={getLinkClasses("/technology")}>
                Technology
              </Link>
              <Link to="/entertainment" className={getLinkClasses("/entertainment")}>
                Entertainment
              </Link>
              <Link to="/science" className={getLinkClasses("/science")}>
                Science
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
              Log in
            </button>
            <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium ml-2">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link to="/business" className={getLinkClasses("/business")}>
            Business
          </Link>
          <Link to="/technology" className={getLinkClasses("/technology")}>
            Technology
          </Link>
          <Link to="/entertainment" className={getLinkClasses("/entertainment")}>
            Entertainment
          </Link>
          <Link to="/science" className={getLinkClasses("/science")}>
            Science
          </Link>
          <button className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
            Log in
          </button>
          <button className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
