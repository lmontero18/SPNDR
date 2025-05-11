"use client";
import StatCard from "@/components/dashboard/StatCard";
import { stats } from "@/data/dashboard/stats";
export default function DashboardMain() {
  const name = "Luis 👋";

  return (
    <section className="flex flex-col mt-10 gap-15">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-black">Welcome back, {name}</h1>
        <p className="text-sm text-slate-600">
          This is your personal financial dashboard. Track your income,
          expenses, savings and decisions, all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}
