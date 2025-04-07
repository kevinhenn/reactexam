import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CohortModules = () => {
  const { cohortId } = useParams();  // Get cohort ID from URL
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cohortId) {
      console.log(`Fetching modules for cohort: ${cohortId}`);  // Debugging log

      fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched module data:", data);  // Debugging log
          setModules(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching modules:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [cohortId]);

  if (loading) return <p>Loading modules...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cohortId) return <p>Please select a cohort.</p>;

  return (
    <div>
      <h1>Modules Delivered to {cohortId}</h1>
      {modules.length > 0 ? (
        <ul>
          {modules.map(module => (
            <li key={module.code}>
              <Link to={`/module/${module.code}`}>{module.full_name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No modules found for this cohort.</p>
      )}
    </div>
  );
};

export default CohortModules;