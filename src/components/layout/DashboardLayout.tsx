import type { ReactNode } from "react";
import Navbar from "../Navbar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}