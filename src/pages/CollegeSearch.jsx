import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUniqueCategories, findEligibleColleges } from '../utils/collegeUtils';

const CollegeSearch = ({ collegeData }) => {
  const [categories, setCategories] = useState([]);
  const [userRank, setUserRank] = useState('');
  const [userCategory, setUserCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const uniqueCategories = getUniqueCategories(collegeData);
    setCategories(uniqueCategories);
  }, [collegeData]);

  const handleSearch = () => {
    setError('');

    if (!userRank || !userCategory) {
      setError('Please enter both rank and category');
      return;
    }

    const rank = parseInt(userRank, 10);
    if (isNaN(rank) || rank <= 0) {
      setError('Please enter a valid rank');
      return;
    }

    const eligibleColleges = findEligibleColleges(collegeData, rank, userCategory);
    setSearchResults(eligibleColleges);
    setSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Colleges by Rank</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Rank</label>
            <input
              type="number"
              min={1}
              value={userRank}
              onChange={(e) => setUserRank(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your rank"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Category</label>
            <select
              value={userCategory}
              onChange={(e) => setUserCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}
      </div>

      {searched && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>

          {searchResults.length === 0 ? (
            <div className="p-4 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded">
              No colleges found matching your criteria. Try a higher rank or different category.
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Found {searchResults.length} colleges where you are eligible for admission with rank {userRank} in category <strong>{userCategory}</strong>.
              </p>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((college) => (
                  <div key={college.code} className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{college.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{college.university}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{college.status}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{college.admission_type}</span>
                      </div>

                      <h4 className="text-sm font-semibold mb-1">
                        Eligible Branches ({college.eligible_branches.length}):
                      </h4>

                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {college.eligible_branches.slice(0, 3).map((branch) => (
                          <li key={branch.code}>{branch.name}</li>
                        ))}
                        {college.eligible_branches.length > 3 && (
                          <li className="text-gray-500">
                            +{college.eligible_branches.length - 3} more branches
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                      <Link
                        to={`Collage_finder/college/${college.code}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`Collage_finder/compare?colleges=${college.code}`}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Add to Compare
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CollegeSearch;
