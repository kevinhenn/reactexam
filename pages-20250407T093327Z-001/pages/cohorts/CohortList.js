import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CohortList() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(response => response.json())
      .then(data => setCohorts(data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Cohorts</h1>

        <ul className="space-y-4">
          {cohorts.map(cohort => (
            <li key={cohort.id}>
              <Link
                to={`/cohorts/${cohort.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                {cohort.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link
            to="/create-cohort"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Create a Cohort
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CohortList;