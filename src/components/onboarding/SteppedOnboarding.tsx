"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboarding } from "@/hooks/onboarding/useOnBoarding";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

const SteppedOnboarding = () => {
  const {
    currentStep,
    totalSteps,
    currentStepData,
    formData,
    value,
    handleChange,
    handleNext,
    handleBack,
  } = useOnboarding();

  const [currency, setCurrency] = useState("₡");
  const { setUserData } = useUserStore();
  const router = useRouter();

  const formatNumber = (num: string | number) => {
    const n = typeof num === "string" ? Number(num.replaceAll(",", "")) : num;
    if (isNaN(n)) return "";
    return new Intl.NumberFormat("en-US").format(n);
  };

  const unformatNumber = (str: string) => {
    return str.replaceAll(",", "");
  };

  const handleFinish = () => {
    setUserData({
      income: Number(formData["monthly_income"]),
      expenses: Number(formData["fixed_expenses"]),
      debts: Number(formData["debt_payments"]),
      savings: Number(formData["savings_goal"]),
      currency,
      financialPriority: formData["financial_priority"],
      budgetingExperience: formData["budgeting_experience"],
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background text-foreground">
      <div className="w-full max-w-2xl bg-card text-card-foreground border border-border shadow-lg rounded-lg p-8">
        <Steps stepsComplete={currentStep} numSteps={totalSteps} />

        <div className="mt-8 mb-6">
          <label className="block text-sm font-medium mb-2">
            {currentStepData.label}
          </label>

          {currentStepData.type === "number" ? (
            <div className="flex gap-2 items-center">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-10 px-3 py-2 border border-input bg-background text-foreground rounded text-sm w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="₡">CRC (₡)</SelectItem>
                  <SelectItem value="$">USD ($)</SelectItem>
                </SelectContent>
              </Select>

              <input
                type="text"
                inputMode="numeric"
                className="h-10 flex-1 px-4 py-2 border border-input bg-background text-foreground rounded placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder={currentStepData.placeholder || `${currency}0`}
                value={value ? `${currency}${formatNumber(value)}` : ""}
                onChange={(e) => {
                  const raw = e.target.value.replace(currency, "").trim();
                  handleChange(unformatNumber(raw));
                }}
              />
            </div>
          ) : currentStepData.type === "select" ? (
            <Select value={value} onValueChange={handleChange}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {currentStepData.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-input text-foreground rounded disabled:opacity-30 hover:bg-muted"
          >
            Prev
          </button>
          <button
            onClick={currentStep === totalSteps - 1 ? handleFinish : handleNext}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
          >
            {currentStep === totalSteps - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SteppedOnboarding;

const Steps = ({
  stepsComplete,
  numSteps,
}: {
  stepsComplete: number;
  numSteps: number;
}) => {
  const stepArray = Array.from({ length: numSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between gap-3">
      {stepArray.map((stepNum) => {
        const isActive = stepNum <= stepsComplete + 1;
        return (
          <React.Fragment key={stepNum}>
            <Step num={stepNum} isActive={isActive} />
            {stepNum !== numSteps && (
              <div className="w-full h-1 rounded-full bg-muted relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-primary rounded-full"
                  animate={{ width: isActive ? "100%" : 0 }}
                  transition={{ ease: "easeIn", duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Step = ({ num, isActive }: { num: number; isActive: boolean }) => {
  return (
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted text-muted-foreground"
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <div className="absolute z-0 -inset-1.5 bg-primary/10 rounded-full animate-pulse" />
      )}
    </div>
  );
};
