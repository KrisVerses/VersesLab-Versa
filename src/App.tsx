import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./app/StateProvider";
import { AppRoutes } from "./app/AppRoutes";
import { Navbar } from "./components/Navbar";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <StateProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <AppRoutes />
            </main>
          </div>
        </StateProvider>
      </Router>
    </ErrorBoundary>
  );
}; 