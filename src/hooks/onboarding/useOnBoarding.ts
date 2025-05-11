"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export const useOnboarding = () => {
  const router = useRouter();
  const { setUserData } = useUserStore();

  const totalSteps = 4;
  const fields = ["income", "expenses", "debts", "savings"] as const;
  const labels = [
    "What's your monthly income?",
    "What are your fixed expenses?",
    "How much do you pay in debts?",
    "What's your savings goal?",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    debts: "",
    savings: "",
  });

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      setUserData({
        income: Number(formData.income),
        expenses: Number(formData.expenses),
        debts: Number(formData.debts),
        savings: Number(formData.savings),
      });
      router.push("/dashboard");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleChange = (value: string) => {
    const field = fields[currentStep];
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    currentStep,
    totalSteps,
    labels,
    field: fields[currentStep],
    value: formData[fields[currentStep]],
    handleChange,
    handleNext,
    handleBack,
  };
};
