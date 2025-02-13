import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export const Navbar: React.FC = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-customBlue border-b-2 border-customBlue"
      : "hover:text-customPink";

  return (
    <nav className="flex  justify-center w-full bg-gray-400">
      <div className="flex items-center justify-between w-7/12 mx-auto">
        <ul className="flex space-x-8 p-4 text-lg font-semibold tracking-wide">
          <li className="mr-6">
            <NavLink to={"/"} className={getNavClass}>
              Home
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to={"/tasks"} className={getNavClass}>
              Tasks
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to={"/appointments"} className={getNavClass}>
              Appointments
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to={"/notes"} className={getNavClass}>
              Notes
            </NavLink>
          </li>
        </ul>
        <div>
          <p>Welcome! [User]</p>
        </div>
      </div>
    </nav>
  );
};
