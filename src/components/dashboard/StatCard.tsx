type StatCardProps = {
  title: string;
  value: number;
  icon: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 hover:border-blue-500 transition">
      <div className="text-4xl">{icon}</div>

      <h3 className="text-gray-400 mt-4">{title}</h3>

      <p className="text-4xl font-bold text-white mt-2">
        {value}
      </p>
    </div>
  );
}