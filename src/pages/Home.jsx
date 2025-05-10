import { Link } from 'react-router-dom';
import { Search, CompareArrows } from '@mui/icons-material';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fadeIn">
          Discover Your <span className="text-blue-600">Ideal College</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn delay-200">
          Search and compare colleges effortlessly based on your entrance exam rank, category, and preferences.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Search Card */}
        <div className="bg-white border border-blue-100 rounded-3xl shadow-md p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <Search className="text-blue-500 text-7xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Find Colleges by Rank</h3>
            <p className="text-gray-600 mb-6">
              Input your exam rank and category to discover colleges you're eligible for.
            </p>
            <Link
              to="/search"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Search Colleges
            </Link>
          </div>
        </div>

        {/* Compare Card */}
        <div className="bg-white border border-blue-100 rounded-3xl shadow-md p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <CompareArrows className="text-blue-500 text-7xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Compare Colleges</h3>
            <p className="text-gray-600 mb-6">
              Choose multiple colleges and compare their cutoffs, branches, and admission details side by side.
            </p>
            <Link
              to="/compare"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Compare Colleges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
