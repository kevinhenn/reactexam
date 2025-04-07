import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateDegree() {
  const [full_name, setFullName] = useState('');
  const [shortcode, setShortcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const degree = { full_name, shortcode };

    fetch('http://127.0.0.1:8000/api/degree/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(degree),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/degrees');
      })
      .catch(error => console.error('Error creating degree:', error));
  };

  return (
    <div className=" bg-blue-900 min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create a New Degree</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Degree Full Name</label>
            <input
              type="text"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Degree Shortcode</label>
            <input
              type="text"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Degree
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDegree;