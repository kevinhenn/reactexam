import React, { useState } from 'react';

const CreateModule = () => {
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [deliveredTo, setDeliveredTo] = useState('');
  const [caSplit, setCaSplit] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newModule = {
      code,
      full_name: fullName,
      delivered_to: [deliveredTo],
      ca_split: caSplit,
    };

    fetch('http://127.0.0.1:8000/api/module/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newModule),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Module Created:', data);
        // Optionally, redirect or give feedback
      });
  };

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create New Module</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Delivered To (Cohort)</label>
            <input
              type="text"
              value={deliveredTo}
              onChange={(e) => setDeliveredTo(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">CA Split</label>
            <input
              type="number"
              value={caSplit}
              onChange={(e) => setCaSplit(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Module
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateModule;