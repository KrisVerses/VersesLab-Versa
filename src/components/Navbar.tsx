import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }): string =>
    `px-4 py-2 font-medium transition-all duration-200 border-b-2 ${
      isActive
        ? "text-blue-600 border-blue-600"
        : "text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-400"
    }`;

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Versa
              </span>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <ul className="flex space-x-8">
              <li>
                <NavLink to="/" className={getNavClass} end>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/tasks" className={getNavClass}>
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink to="/appointments" className={getNavClass}>
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/notes" className={getNavClass}>
                  Notes
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  {getInitial('user')}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  User
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Only visible on small screens */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              }`
            }
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              }`
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              }`
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              }`
            }
          >
            Notes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
