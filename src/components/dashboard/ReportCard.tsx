import { voteReport } from "../../services/voting";

type Props = {
  report: any;
  refresh: () => void;
};

export default function ReportCard({ report, refresh }: Props) {
  const handleVote = async () => {
    await voteReport(report.id);
    refresh();
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5 mb-5 border border-slate-700">

      <h2 className="text-2xl font-bold text-white">
        {report.title}
      </h2>

      <p className="text-slate-300 mt-2">
        {report.description}
      </p>

      <div className="mt-4 flex gap-4">

        <span className="bg-blue-600 px-3 py-1 rounded">
          📌 {report.status}
        </span>

        <span className="bg-green-600 px-3 py-1 rounded">
          👍 {report.votes || 0}
        </span>

      </div>

      <button
        onClick={handleVote}
        className="mt-5 bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-xl font-semibold"
      >
        👍 Upvote Issue
      </button>

    </div>
  );
}