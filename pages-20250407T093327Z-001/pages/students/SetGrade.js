import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function SetGrade() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedModules = location.state?.modules || [];

  const [selectedModule, setSelectedModule] = useState('');
  const [caMark, setCaMark] = useState('');
  const [examMark, setExamMark] = useState('');
  const [totalGrade, setTotalGrade] = useState(0);

  const [modules] = useState(passedModules);

  useEffect(() => {
    if (caMark && examMark) {
      const total = (parseFloat(caMark) + parseFloat(examMark)) / 2;
      setTotalGrade(total.toFixed(2));
    }
  }, [caMark, examMark]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const gradeData = {
      student: studentId,
      module: selectedModule,
      ca_mark: caMark,
      exam_mark: examMark,
      total_grade: totalGrade,
    };

    // Check if a grade already exists
    fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}&module=${selectedModule}`)
      .then((res) => res.json())
      .then((existingGrades) => {
        if (existingGrades.length > 0) {
          // Update existing grade
          const gradeId = existingGrades[0].id;
          return fetch(`http://127.0.0.1:8000/api/grade/${gradeId}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(gradeData),
          });
        } else {
          // Create new grade
          return fetch('http://127.0.0.1:8000/api/grade/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(gradeData),
          });
        }
      })
      .then((response) => response.json())
      .then(() => {
        navigate(`/students/${studentId}`);
      })
      .catch((error) => console.error('Error setting grade:', error));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4">Set Grade for Student</h1>

      <form onSubmit={handleSubmit}>
        {/* Select Module */}
        <div className="mb-4">
          <label htmlFor="module" className="block text-gray-700 font-medium mb-2">Module:</label>
          <select
            id="module"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a module</option>
            {modules.length > 0 ? (
              modules.map((module) => (
                <option key={module.code} value={module.code}>
                  {module.full_name}
                </option>
              ))
            ) : (
              <option disabled>No modules found for this student.</option>
            )}
          </select>
        </div>

        {/* CA Mark Input */}
        <div className="mb-4">
          <label htmlFor="caMark" className="block text-gray-700 font-medium mb-2">CA Mark:</label>
          <input
            type="number"
            id="caMark"
            value={caMark}
            onChange={(e) => setCaMark(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter CA mark"
            required
          />
        </div>

        {/* Exam Mark Input */}
        <div className="mb-4">
          <label htmlFor="examMark" className="block text-gray-700 font-medium mb-2">Exam Mark:</label>
          <input
            type="number"
            id="examMark"
            value={examMark}
            onChange={(e) => setExamMark(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter exam mark"
            required
          />
        </div>

        {/* Total Grade Display */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Total Grade:</label>
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
            {totalGrade}%
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Set Grade
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetGrade;