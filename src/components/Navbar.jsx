import { Link } from 'react-router-dom';
import { School } from 'lucide-react'; // lightweight icon alternative

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <School className="text-white w-6 h-6" />
          <Link to="/" className="text-white text-lg font-bold hover:underline">
            College Finder
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
          >
            Find Colleges
          </Link>
          <Link
            to="/compare"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
          >
            Compare Colleges
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
