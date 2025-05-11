"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IconType } from "react-icons";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: IconType;
  trend?: "up" | "down";
  change?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  change,
}: StatCardProps) {
  const trendColor = trend === "up" ? "text-emerald-500" : "text-rose-500";
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-700">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-zinc-400" />
      </CardHeader>

      <CardContent>
        <CountUp target={parseInt(value.replace(/[₡,]/g, ""))} prefix="₡" />

        {trend && change && (
          <div className="flex items-center pt-1">
            <TrendIcon className={`mr-1 h-4 w-4 ${trendColor}`} />
            <CardDescription className={`text-xs ${trendColor}`}>
              {change} from last month
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

//integrate logic in other file
const CountUp = ({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(
            value
          ).toLocaleString("es-CR")}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [target, prefix, suffix, isInView]);

  return (
    <span
      ref={ref}
      className="text-2xl font-bold text-zinc-900 block leading-tight"
    >
      0
    </span>
  );
};
