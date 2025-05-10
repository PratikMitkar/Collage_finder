import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findCollegeByCode } from '../utils/collegeUtils';
import { ArrowLeft, ArrowRightLeft } from 'lucide-react';

const CollegeDetails = ({ collegeData }) => {
  const { collegeCode } = useParams();
  const [college, setCollege] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (collegeData && collegeCode) {
      const foundCollege = findCollegeByCode(collegeData, collegeCode);
      if (foundCollege) {
        setCollege(foundCollege);
      } else {
        setError(`College with code ${collegeCode} not found`);
      }
    }
  }, [collegeData, collegeCode]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        <Link to="/search" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p>Loading college details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Link to="/search" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
        <Link
          to={`/compare?colleges=${collegeCode}`}
          className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 transition"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Add to Compare
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-semibold mb-2">{college.name}</h1>
        <p className="text-gray-500 mb-4">{college.university}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{college.status}</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{college.admission_type}</span>
          <span className="px-3 py-1 border text-gray-700 rounded-full text-sm">Code: {college.code}</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Branches and Cutoff Ranks</h2>

      <div className="space-y-6">
        {college.branches.map((branch) => (
          <div key={branch.code} className="bg-gray-50 border rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-medium mb-1">{branch.name}</h3>
            <p className="text-gray-500 mb-4 text-sm">Branch Code: {branch.code}</p>

            {Object.keys(branch.seat_allocations).map((allocationType) => {
              const allocation = branch.seat_allocations[allocationType];
              return (
                <div key={allocationType} className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">{allocation.type}</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-left">
                      <thead className="bg-blue-100 text-blue-800">
                        <tr>
                          <th className="px-4 py-2 border">Category</th>
                          <th className="px-4 py-2 border text-right">Closing Rank</th>
                          <th className="px-4 py-2 border text-right">Percentile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(allocation.categories).map((category) => {
                          const categoryData = allocation.categories[category];
                          return (
                            <tr key={category} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border">{category}</td>
                              <td className="px-4 py-2 border text-right">{categoryData.rank}</td>
                              <td className="px-4 py-2 border text-right">{categoryData.percentile.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDetails;
