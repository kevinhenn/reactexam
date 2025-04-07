import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cohort, setCohort] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      cohort: cohort,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Error creating student');
      }

      const data = await response.json();
      navigate(`/students/${data.student_id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create New Student</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="cohort" className="block text-lg font-medium text-gray-700 mb-2">Cohort</label>
            <input
              type="text"
              id="cohort"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;