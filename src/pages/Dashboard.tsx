import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import { getReports } from "../services/getReports";
import ReportCard from "../components/dashboard/ReportCard";

export default function Dashboard() {
  const [reports, setReports] = useState<any[]>([]);

const loadReports = async () => {
  const data = await getReports();

  data.sort(
    (a: any, b: any) => (b.votes || 0) - (a.votes || 0)
  );

  setReports(data);
};

useEffect(() => {
  loadReports();
}, []);

  const total = reports.length;

  const pending = reports.filter(
    (r) => (r.status || "Pending") === "Pending"
  ).length;

  const resolved = reports.filter(
    (r) => r.status === "Resolved"
  ).length;

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        👋 Welcome to Community Hero AI
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Open Issues"
          value={total}
          icon="🚨"
        />

        <StatCard
          title="Resolved"
          value={resolved}
          icon="✅"
        />

        <StatCard
          title="Pending"
          value={pending}
          icon="⏳"
        />

        <StatCard
          title="Community Points"
          value={total * 10}
          icon="🏆"
        />

      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <QuickActionCard
          title="Report Issue"
          icon="📷"
          to="/report"
        />

        <QuickActionCard
          title="My Reports"
          icon="📄"
          to="/dashboard"
        />

        <QuickActionCard
          title="Explore Map"
          icon="🗺️"
          to="/dashboard"
        />

        <QuickActionCard
          title="AI Insights"
          icon="🤖"
          to="/dashboard"
        />

      </div>

      <div className="mt-12">
  <RecentActivity />
</div>

<h2 className="text-3xl font-bold text-white mt-12 mb-6">
  🔥 Trending Community Issues
</h2>

<div className="space-y-5">
  {reports.map((report) => (
    <ReportCard
      key={report.id}
      report={report}
      refresh={loadReports}
    />
  ))}
</div>

    </DashboardLayout>
  );
}