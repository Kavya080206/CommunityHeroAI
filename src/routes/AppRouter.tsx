import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ReportIssue from "../pages/ReportIssue";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<ReportIssue />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}