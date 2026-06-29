import { useEffect, useState } from "react";
import { getReports } from "../../services/dashboard";

export default function RecentActivity() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await getReports();
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-400">
          No reports submitted yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reports.map((report: any) => (
            <div
              key={report.id}
              className="bg-slate-800 rounded-xl p-4"
            >
              <h3 className="text-lg font-bold text-white">
                🚨 {report.title}
              </h3>

              <p className="text-gray-300 mt-1">
                {report.description}
              </p>

              <div className="flex gap-3 mt-3 flex-wrap">
                <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                  {report.status || "Pending"}
                </span>

                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {report.department || "Department"}
                </span>

                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                  {report.severity || "Medium"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}