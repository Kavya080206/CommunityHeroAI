import { Link } from "react-router-dom";

type Props = {
  title: string;
  icon: string;
  to: string;
};

export default function QuickActionCard({
  title,
  icon,
  to,
}: Props) {
  return (
    <Link
      to={to}
      className="bg-slate-900 rounded-2xl p-6 hover:bg-slate-800 transition block"
    >
      <div className="text-4xl">{icon}</div>

      <h3 className="text-white mt-4 text-xl font-semibold">
        {title}
      </h3>
    </Link>
  );
}