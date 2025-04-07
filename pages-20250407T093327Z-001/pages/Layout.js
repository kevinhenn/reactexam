import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold">
            University System
          </Link>
          <nav className="space-x-4">
            <Link to="/degrees" className="hover:text-gray-300">
              Degrees
            </Link>
            <Link to="/cohorts" className="hover:text-gray-300">
              Cohorts
            </Link>
            <Link to="/modules" className="hover:text-gray-300">
              Modules
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 University System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;