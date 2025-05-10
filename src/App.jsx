import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CollegeSearch from './pages/CollegeSearch';
import CollegeComparison from './pages/CollegeComparison';
import CollegeDetails from './pages/CollegeDetails';
import Navbar from './components/Navbar';

function App() {
  const [collegeData, setCollegeData] = useState({ institutes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.BASE_URL + 'college_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCollegeData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-blue-600 text-xl font-medium animate-pulse">
        Loading college data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-600 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<CollegeSearch collegeData={collegeData} />} />
            <Route path="/compare" element={<CollegeComparison collegeData={collegeData} />} />
            <Route path="/college/:collegeCode" element={<CollegeDetails collegeData={collegeData} />} />
          </Routes>
        </main>
        <footer className="text-center text-sm text-gray-500 py-4 border-t mt-8">
          &copy; {new Date().getFullYear()} College Finder. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
