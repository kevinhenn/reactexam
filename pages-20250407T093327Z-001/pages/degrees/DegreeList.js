import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DegreeList() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => setDegrees(data))
      .catch(error => console.error("Error fetching degrees:", error));
  }, []);

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">All Degrees</h1>
        {degrees.length > 0 ? (
          <ul className="space-y-4">
            {degrees.map(degree => (
              <li key={degree.shortcode}>
                <Link
                  to={`/degrees/${degree.shortcode}`}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 block text-center"
                >
                  {degree.full_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No degrees available.</p>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/create-degree"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Create a Degree
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DegreeList;