import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ModuleStudents = () => {
  const { moduleCode } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/student/?module_code=${moduleCode}`);
        if (!response.ok) {
          throw new Error(`Error fetching students: ${response.statusText}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [moduleCode]);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Students in Module: {moduleCode}</h2>

        {students.length === 0 ? (
          <p className="text-lg text-gray-700">No students found in this module.</p>
        ) : (
          <ul className="space-y-4">
            {students.map((student) => (
              <li key={student.student_id} className="border-b border-gray-300 pb-4">
                <Link
                  to={`/student/${student.student_id}`}
                  className="text-blue-500 hover:text-blue-700 text-lg"
                >
                  {student.first_name} {student.last_name} - {student.email}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModuleStudents;