"use client";

import {
  FiDollarSign,
  FiTrendingDown,
  FiTrendingUp,
  FiCreditCard,
} from "react-icons/fi";
import { IconType } from "react-icons";

type Trend = "up" | "down";

interface StatItem {
  title: string;
  value: string;
  icon: IconType;
  trend?: Trend;
  change?: string;
}

export const stats: StatItem[] = [
  {
    title: "Monthly Income",
    value: "₡600,000",
    icon: FiDollarSign,
    trend: "up",
    change: "+5%",
  },
  {
    title: "Fixed Expenses",
    value: "₡210,000",
    icon: FiTrendingDown,
    trend: "down",
    change: "-2%",
  },
  {
    title: "Debt Payments",
    value: "₡75,000",
    icon: FiCreditCard,
    trend: "down",
    change: "-1%",
  },
  {
    title: "Savings Goal",
    value: "₡50,000",
    icon: FiTrendingUp,
    trend: "up",
    change: "+10%",
  },
  {
    title: "Free to Spend",
    value: "₡265,000",
    icon: FiDollarSign,
    trend: "up",
    change: "+7%",
  },
];
