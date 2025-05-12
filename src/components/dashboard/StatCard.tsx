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
import { animate, useInView, motion } from "framer-motion";

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
    <div className="group relative w-full overflow-hidden rounded-lg bg-transparent p-[1px] transition-all duration-300 hover:scale-[1.01]">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 rounded-lg bg-gradient-to-br from-indigo-300 via-indigo-200/0 to-indigo-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
      />

      <Card className="relative z-10 overflow-hidden rounded-lg bg-background hover:cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4" />
        </CardHeader>

        <CardContent>
          <CountUp
            target={Number(value.replace(/[^\d.-]/g, ""))}
            prefix={
              value.trim().startsWith("₡")
                ? "₡"
                : value.trim().startsWith("$")
                ? "$"
                : ""
            }
          />

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
    </div>
  );
}

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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || !ref.current || hasAnimated.current) return;

    hasAnimated.current = true;
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
    <span ref={ref} className="text-2xl font-bold block leading-tight">
      0
    </span>
  );
};
