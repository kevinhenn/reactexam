import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function StudentDetail() {
  const { studentId } = useParams(); // Get student ID from URL
  const [student, setStudent] = useState(null);
  const [allModules, setAllModules] = useState([]);
  const [modules, setModules] = useState([]);
  const [grades, setGrades] = useState([]);

  // Fetch student details, all modules, and grades
  useEffect(() => {
    console.log("Student ID:", studentId); // Log the studentId to ensure it's correct

    if (!studentId) return; // Early return if studentId is missing or invalid

    // Fetch student details
    fetch(`http://127.0.0.1:8000/api/student/${studentId}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        return response.json();
      })
      .then(data => {
        console.log("Student data:", data);
        if (data && Object.keys(data).length > 0) {
          setStudent(data);
        } else {
          setStudent(null); // Handle case where student is not found
        }
      })
      .catch(error => console.error('Error fetching student details:', error));

    // Fetch all modules
    fetch(`http://127.0.0.1:8000/api/module/`)
      .then(response => response.json())
      .then(data => {
        console.log("All modules:", data);
        setAllModules(data);
      })
      .catch(error => console.error('Error fetching all modules:', error));

    // Fetch grades for the student
    fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Grades data:", data);
        setGrades(data);
      })
      .catch(error => console.error('Error fetching grades:', error));
  }, [studentId]);

  // Filter the modules the student is enrolled in
  useEffect(() => {
    if (student && allModules.length > 0) {
      const studentModules = allModules.filter(module => {
        if (module.delivered_to) {
          return module.delivered_to.some(cohort => cohort === student.cohort);
        }
        return false;
      });

      setModules(studentModules);
    }
  }, [student, allModules]);

  // Extract cohort name from URL
  const cohortName = student?.cohort ? student.cohort.split('/').slice(-2, -1)[0] : 'Unknown Cohort';

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        {student ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{student.first_name} {student.last_name}</h1>
            <p className="text-lg text-gray-700 mb-4"><strong>Email:</strong> {student.email}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Cohort:</strong> {cohortName}</p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Modules:</h2>
            <ul className="space-y-3 mb-6">
              {modules.length > 0 ? (
                modules.map(module => (
                  <li key={module.code}>
                    <Link to={`/module/${module.code}`} className="text-blue-500 hover:text-blue-700 text-lg">
                      {module.full_name}
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-lg text-gray-700">No modules found for this student.</p>
              )}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Grades:</h2>
            <ul className="space-y-4">
              {grades.length > 0 ? (
                grades.map(grade => (
                  <li key={grade.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <p className="text-lg text-gray-800"><strong>Module:</strong> {grade.module.split('/').slice(-2, -1)[0]}</p>
                    <p className="text-lg text-gray-700"><strong>CA Mark:</strong> {grade.ca_mark}%</p>
                    <p className="text-lg text-gray-700"><strong>Exam Mark:</strong> {grade.exam_mark}%</p>
                    <p className="text-lg text-gray-700"><strong>Total Grade:</strong> {grade.total_grade}%</p>
                  </li>
                ))
              ) : (
                <p className="text-lg text-gray-700">No grades found for this student.</p>
              )}
            </ul>
          </>
        ) : (
          <p className="text-lg text-gray-700">Loading student details...</p>
        )}
        <br></br>
        <Link to={`/student/${studentId}/set-grade`} state={{ modules }}>
          Set Grade
        </Link>
      </div>
    </div>
  );
}

export default StudentDetail;