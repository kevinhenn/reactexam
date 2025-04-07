import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ModuleDetail = () => {
  const { moduleCode } = useParams();
  console.log("Module Code:", moduleCode);  // Check if moduleCode is passed correctly

  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/module/${moduleCode}/`);
        if (!response.ok) {
          throw new Error(`Error fetching module details: ${response.statusText}`);
        }
        const data = await response.json();
        setModule(data);
      } catch (error) {
        console.error("Error fetching module:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleCode]);

  if (loading) return <p>Loading module details...</p>;
  if (error) return <p>Error: {error}</p>;

  const cohorts = module?.delivered_to
    ? module.delivered_to.map(url => url.split('/').slice(-2, -1)[0])
    : [];

  return (
    <div className="bg-blue-900 min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        {module ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Module: {moduleCode}</h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Module Name:</strong> {module.full_name}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>CA split:</strong> {module.ca_split}%
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Delivered To Cohorts:</h3>
            {cohorts.length === 0 ? (
              <p>No cohorts found for this module.</p>
            ) : (
              <ul className="space-y-2 mb-4">
                {cohorts.map((cohort, index) => (
                  <li key={index}>
                    <Link to={`/cohorts/${cohort}`} className="text-blue-500 hover:text-blue-700">
                      {cohort}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to={`/modules/${moduleCode}/students`}
              className="inline-block mt-4 text-blue-500 hover:text-blue-700"
            >
              View Students in {moduleCode}
            </Link>
          </div>
        ) : (
          <p>No module found.</p>
        )}
      </div>
    </div>
  );
};

export default ModuleDetail;