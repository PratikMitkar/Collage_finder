import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { findCollegeByCode } from '../utils/collegeUtils';
import { Trash2, Plus } from 'lucide-react';

const CollegeComparison = ({ collegeData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [availableColleges, setAvailableColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const collegeParam = params.get('colleges');

    if (collegeParam) {
      const collegeCodes = collegeParam.split(',');
      const foundColleges = collegeCodes.map(code => {
        const college = findCollegeByCode(collegeData, code);
        return college ? { ...college, code } : null;
      }).filter(Boolean);

      setColleges(foundColleges);
    }

    const allColleges = collegeData.institutes.map(inst => ({
      code: inst.institute.code,
      name: inst.institute.name
    }));

    setAvailableColleges(allColleges);
  }, [collegeData, location.search]);

  const handleAddCollege = () => {
    if (!selectedCollege) return setError('Please select a college to add');
    if (colleges.some(c => c.code === selectedCollege)) return setError('This college is already in the comparison');

    const college = findCollegeByCode(collegeData, selectedCollege);
    if (!college) return setError('College not found');

    const updated = [...colleges, { ...college, code: selectedCollege }];
    const newCodes = updated.map(c => c.code).join(',');
    navigate(`Collage_finder/compare?colleges=${newCodes}`);
    setColleges(updated);
    setSelectedCollege('');
    setError('');
  };

  const handleRemoveCollege = (code) => {
    const updated = colleges.filter(c => c.code !== code);
    const newCodes = updated.map(c => c.code).join(',');
    navigate(updated.length ? `Collage_finder/compare?colleges=${newCodes}` : 'Collage_finder/compare');
    setColleges(updated);
  };

  const getBranches = () => {
    const set = new Set();
    colleges.forEach(c => c.branches.forEach(b => set.add(b.name)));
    return Array.from(set).sort();
  };

  const getBranch = (college, name) => college.branches.find(b => b.name === name);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Compare Colleges</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="border p-2 rounded col-span-1"
            value={selectedCollege}
            onChange={e => setSelectedCollege(e.target.value)}
          >
            <option value="">Select a college</option>
            {availableColleges.map(college => (
              <option key={college.code} value={college.code}>{college.name}</option>
            ))}
          </select>

          <button
            className="bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-1"
            onClick={handleAddCollege}
          >
            <Plus size={16} /> Add
          </button>

          <Link to="Collage_finder/search" className="border py-2 px-4 rounded text-center">
            Search for Colleges
          </Link>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {colleges.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
          No colleges selected for comparison.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">College Details</th>
                {colleges.map(college => (
                  <th key={college.code} className="text-center p-2 border relative">
                    <div className="font-semibold">{college.name}</div>
                    <button
                      className="absolute top-1 right-1 text-red-500"
                      onClick={() => handleRemoveCollege(college.code)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border">University</td>
                {colleges.map(c => <td key={c.code} className="text-center border p-2">{c.university}</td>)}
              </tr>
              <tr>
                <td className="p-2 border">Status</td>
                {colleges.map(c => <td key={c.code} className="text-center border p-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{c.status}</span></td>)}
              </tr>
              <tr>
                <td className="p-2 border">Admission Type</td>
                {colleges.map(c => <td key={c.code} className="text-center border p-2"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{c.admission_type}</span></td>)}
              </tr>
              <tr>
                <td className="p-2 border">Number of Branches</td>
                {colleges.map(c => <td key={c.code} className="text-center border p-2">{c.branches.length}</td>)}
              </tr>
              <tr>
                <td className="font-semibold p-2 border" colSpan={colleges.length + 1}>Branches & Cutoffs</td>
              </tr>

              {getBranches().map(branchName => (
                <tr key={branchName}>
                  <td className="p-2 border font-medium">{branchName}</td>
                  {colleges.map(c => {
                    const branch = getBranch(c, branchName);
                    return (
                      <td key={c.code} className="text-center border p-2 text-sm">
                        {branch ? Object.entries(branch.seat_allocations).map(([allocType, alloc]) => {
                          const category = alloc.categories.GOPENS ? 'GOPENS' : Object.keys(alloc.categories)[0];
                          const rank = alloc.categories[category]?.rank;
                          return rank ? (
                            <div key={allocType} className="mb-1">
                              <div className="text-xs text-gray-500">{alloc.type}</div>
                              <div className="font-medium">Rank: {rank}</div>
                              <div className="text-xs text-gray-400">({category})</div>
                            </div>
                          ) : null;
                        }) : 'N/A'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CollegeComparison;