import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};
