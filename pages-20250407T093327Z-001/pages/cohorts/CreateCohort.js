import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCohort() {
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [degrees, setDegrees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch degrees for the dropdown
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => setDegrees(data))
      .catch(error => console.error('Error fetching degrees:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cohort = { name, degree };

    fetch('http://127.0.0.1:8000/api/cohort/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cohort),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/cohorts'); // Redirect to all cohorts page
      })
      .catch(error => console.error('Error creating cohort:', error));
  };

  return (
    <div className=" bg-blue-900 min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create New Cohort</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Cohort Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Select Degree</label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a degree</option>
              {degrees.map(deg => (
                <option key={deg.id} value={deg.id}>{deg.full_name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Cohort
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCohort;