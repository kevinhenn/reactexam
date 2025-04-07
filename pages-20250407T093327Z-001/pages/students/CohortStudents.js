import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CohortStudents = () => {
  const { cohortId } = useParams(); // This gets the cohort ID from the URL
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortId}`);
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
  }, [cohortId]);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">Students in Cohort</h1>
        <br></br>
        {students.length > 0 ? (
          <ul className="space-y-8">
            {students.map((student) => (
              <li key={student.student_id}>
                <Link to={`/student/${student.student_id}`} className="button">
                  {student.first_name} {student.last_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default CohortStudents;