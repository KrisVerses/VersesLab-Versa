import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};
