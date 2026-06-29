import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export default function AdminDashboard() {
  const [reports, setReports] = useState<any[]>([]);

  const loadReports = async () => {
    const snapshot = await getDocs(collection(db, "reports"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReports(data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await updateDoc(doc(db, "reports", id), {
      status,
    });

    loadReports();
  };

  const deleteReport = async (id: string) => {
    const ok = window.confirm(
      "Delete this report?"
    );

    if (!ok) return;

    await deleteDoc(doc(db, "reports", id));

    loadReports();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        🛡 Admin Dashboard
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-slate-900 rounded-xl p-6">
    <h3 className="text-gray-400">Total Reports</h3>
    <p className="text-4xl font-bold">
      {reports.length}
    </p>
  </div>

  <div className="bg-yellow-700 rounded-xl p-6">
    <h3>Pending</h3>
    <p className="text-4xl font-bold">
      {reports.filter(r => r.status === "Pending").length}
    </p>
  </div>

  <div className="bg-blue-700 rounded-xl p-6">
    <h3>In Progress</h3>
    <p className="text-4xl font-bold">
      {reports.filter(r => r.status === "In Progress").length}
    </p>
  </div>

  <div className="bg-green-700 rounded-xl p-6">
    <h3>Resolved</h3>
    <p className="text-4xl font-bold">
      {reports.filter(r => r.status === "Resolved").length}
    </p>
  </div>

</div>
      <div className="space-y-6">

        {reports.map((report) => (

          <div
            key={report.id}
            className="bg-slate-900 rounded-xl p-6 border border-slate-700"
          >

            <h2 className="text-2xl font-bold">
              {report.title}
            </h2>

            <p className="mt-3 text-gray-300">
              {report.description}
            </p>

            <p className="mt-3">
              <b>Status:</b> {report.status}
            </p>

            <p>
              <b>Votes:</b> {report.votes || 0}
            </p>

            <div className="flex gap-3 mt-5 flex-wrap">

              <button
                onClick={() =>
                  updateStatus(report.id, "Pending")
                }
                className="bg-yellow-600 px-4 py-2 rounded"
              >
                Pending
              </button>

              <button
                onClick={() =>
                  updateStatus(report.id, "In Progress")
                }
                className="bg-blue-600 px-4 py-2 rounded"
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(report.id, "Resolved")
                }
                className="bg-green-600 px-4 py-2 rounded"
              >
                Resolved
              </button>

              <button
                onClick={() =>
                  deleteReport(report.id)
                }
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

        {reports.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            No reports found.
          </div>
        )}

      </div>

    </div>
  );
}