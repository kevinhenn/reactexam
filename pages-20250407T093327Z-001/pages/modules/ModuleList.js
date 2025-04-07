import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const ModuleList = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/module/')
      .then((response) => response.json())
      .then((data) => setModules(data))
      .catch((error) => console.error('Error fetching modules:', error));
  }, []);

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Modules</h1>

      {/* Add link to Create Module Page */}
      <Link
        to="/create-module"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 inline-block hover:bg-blue-600"
      >
        Create New Module
      </Link>

      {/* Display the list of modules */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {modules.length > 0 ? (
          <ul>
            {modules.map((module) => (
              <li key={module.code} className="border-b py-3">
                <Link
                  to={`/modules/${module.code}`}
                  className="text-blue-500 hover:underline"
                >
                  {module.full_name} - {module.code}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No modules found.</p>
        )}
      </div>
    </div>
  );
};

export default ModuleList;