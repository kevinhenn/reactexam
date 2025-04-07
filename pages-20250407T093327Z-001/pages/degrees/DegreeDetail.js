import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DegreeDetail = () => {
  const { id } = useParams(); // Get degree ID from URL
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCohorts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cohorts:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className=" bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Cohorts for Degree: {id}</h1>
        {cohorts.length > 0 ? (
          <ul className="space-y-4">
            {cohorts.map((cohort) => (
              <li key={cohort.id}>
                <Link
                  to={`/cohorts/${cohort.id}`}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 block text-center"
                >
                  {cohort.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No cohorts available for this degree.</p>
        )}
      </div>
    </div>
  );
};

export default DegreeDetail;