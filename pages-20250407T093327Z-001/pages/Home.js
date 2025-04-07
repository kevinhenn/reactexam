import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the University System</h1>
        <p className="text-lg text-gray-600 mb-6">Choose a section to get started:</p>

        <ul className="space-y-4">
          <li>
            <Link
              to="/degrees"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full block text-center"
            >
              View All Degrees
            </Link>
          </li>
          <li>
            <Link
              to="/cohorts"
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full block text-center"
            >
              View All Cohorts
            </Link>
          </li>
          <li>
            <Link
              to="/modules"
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 w-full block text-center"
            >
              View All Modules
            </Link>
          </li>
          <li>
            <Link
              to="/create-student"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
            >
              Add New Student
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;