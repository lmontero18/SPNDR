"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboarding } from "@/hooks/onboarding/useOnBoarding";

const SteppedOnboarding = () => {
  const {
    currentStep,
    totalSteps,
    labels,
    field,
    value,
    handleChange,
    handleNext,
    handleBack,
  } = useOnboarding();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <Steps stepsComplete={currentStep} numSteps={totalSteps} />

        <div className="mt-8 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels[currentStep]}
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="₡"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-black text-white rounded"
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
      {stepArray.map((stepNum, index) => {
        const isActive = stepNum <= stepsComplete + 1;

        return (
          <React.Fragment key={stepNum}>
            <Step num={stepNum} isActive={isActive} />
            {stepNum !== numSteps && (
              <div className="w-full h-1 rounded-full bg-gray-200 relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-indigo-600 rounded-full"
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
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-300 text-gray-300"
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
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
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
        <div className="absolute z-0 -inset-1.5 bg-indigo-100 rounded-full animate-pulse" />
      )}
    </div>
  );
};
