import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CohortDetail = () => {
  const { cohortId } = useParams(); 
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true); 

  console.log('Cohort ID from useParams:', cohortId);

  useEffect(() => {
    if (!cohortId) {
      console.log('Cohort ID is missing');
      return;
    }

    setLoading(true);  

    fetch(`http://127.0.0.1:8000/api/cohort/${cohortId}/`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched cohort data:', data);
        setCohort(data);
      })
      .catch(error => console.error('Error fetching cohort:', error));

    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Raw student data:', data);
        setStudents(Array.isArray(data) ? data : (data.results || [])); 
      })
      .catch(error => console.error('Error fetching students:', error));

    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Raw module data:', data);
        setModules(Array.isArray(data) ? data : (data.results || [])); 
      })
      .catch(error => console.error('Error fetching modules:', error))
      .finally(() => setLoading(false));
  }, [cohortId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  if (!cohort) return <p className="text-center text-red-500">Error loading cohort data.</p>;

  const degreeCode = cohort?.degree ? cohort.degree.split('/').slice(-2, -1)[0] : "Unknown Degree";

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{cohort.name}</h1>
        <h2 className="text-xl text-gray-700 mb-2">Degree: {degreeCode}</h2>
        <h3 className="text-lg text-gray-600 mb-4">Year: {cohort.year}</h3>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            <Link to={`/cohorts/${cohortId}/students`} className="text-blue-600 hover:underline">
              View Students in this Cohort
            </Link>
          </h2>
          <ul className="space-y-4">
            {Array.isArray(students) && students.length > 0 ? (
              students.map(student => (
                <li key={student.id}>
                  <Link
                    to={`/student/${student.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {student.name}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No students found.</p>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Modules Delivered to this Cohort:</h2>
          <ul className="space-y-4">
            {modules.length > 0 ? (
              modules.map((module) => (
                <li key={module.code}>
                  <Link
                    to={`/module/${module.code}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {module.full_name}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No modules available for this cohort.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CohortDetail;