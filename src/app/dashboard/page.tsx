"use client";

import StatCard from "@/components/dashboard/StatCard";
import { useUserStore } from "@/stores/userStore";
import { motion } from "motion/react";
import {
  FiDollarSign,
  FiTrendingDown,
  FiTrendingUp,
  FiCreditCard,
} from "react-icons/fi";

export default function DashboardMain() {
  const name = "Luis 👋";
  const { userData } = useUserStore();

  if (!userData) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const { income, expenses, debts, savings, currency } = userData;

  const freeToSpend = income - expenses - debts - savings;

  const statItems = [
    {
      title: "Monthly Income",
      value: `${currency}${income.toLocaleString("es-CR")}`,
      icon: FiDollarSign,
      trend: "up" as "up",
      change: "+5%",
    },
    {
      title: "Fixed Expenses",
      value: `${currency}${expenses.toLocaleString("es-CR")}`,
      icon: FiTrendingDown,
      trend: "down" as "down",
      change: "-2%",
    },
    {
      title: "Debt Payments",
      value: `${currency}${debts.toLocaleString("es-CR")}`,
      icon: FiCreditCard,
      trend: "down" as "down",
      change: "-1%",
    },
    {
      title: "Savings Goal",
      value: `${currency}${savings.toLocaleString("es-CR")}`,
      icon: FiTrendingUp,
      trend: "up" as "up",
      change: "+10%",
    },
    {
      title: "Free to Spend",
      value: `${currency}${freeToSpend.toLocaleString("es-CR")}`,
      icon: FiDollarSign,
      trend: (freeToSpend >= 0 ? "up" : "down") as "up" | "down",
      change: freeToSpend >= 0 ? "+7%" : "-4%",
    },
  ];

  return (
    <section className="flex flex-col mt-10 gap-15">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
        <p className="text-sm">
          This is your personal financial dashboard. Track your income,
          expenses, savings and decisions, all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
