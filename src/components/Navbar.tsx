import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          Community Hero AI
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/report"
            className="text-gray-300 hover:text-white transition"
          >
            Report
          </Link>

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}