"use client";

import { onboardingSteps } from "@/data/onboarding/onboardingSteps";
import { useState } from "react";

export const useOnboarding = () => {
  const totalSteps = onboardingSteps.length;

  const [formData, setFormData] = useState(
    Object.fromEntries(onboardingSteps.map((step) => [step.id, ""]))
  );
  const [currentStep, setCurrentStep] = useState(0);

  const currentStepData = onboardingSteps[currentStep];
  const currentField = currentStepData.id;

  const handleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, [currentField]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return {
    currentStep,
    totalSteps,
    currentStepData,
    currentField,
    formData,
    value: formData[currentField],
    handleChange,
    handleNext,
    handleBack,
  };
};
