import React from "react";
import { Summary } from "../components/Summary";
import { QuickActions } from "../components/QuickActions";

export const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Versa!</h1>
      <Summary />
      <QuickActions />
    </div>
  );
};
