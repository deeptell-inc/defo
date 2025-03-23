import React from 'react';
import { Check, ArrowRight, User, FileText, Contact } from "lucide-react";
import { motion } from 'framer-motion';
import { ProcessStep } from '@/types/process';
import { cn } from "@/lib/utils";

const progressSteps = [
  { id: 'confirmation_possible', label: '確認電話可能', icon: FileText },
  { id: 're_call', label: '再架電', icon: FileText },
  { id: 'phone_confirmed', label: '確認電話通過', icon: Check },
  { id: 'fp_not_assigned', label: 'FP未振り', icon: User },
  { id: 'fp_inquiry', label: 'FP照会中', icon: User },
  { id: 'chat_group_pending', label: 'チャットグループ未', icon: User },
  { id: 'fp_assigned_no_schedule', label: 'FP振り済日程未定', icon: ArrowRight },
  { id: 'fp_scheduled_monthly', label: 'FP日時確定/月間', icon: ArrowRight },
  { id: 'execution_monthly', label: '実行/月間', icon: ArrowRight },
  { id: 'fp_scheduled_today', label: 'FP日時確定/当日', icon: ArrowRight },
  { id: 'execution_today', label: '実行/当日', icon: ArrowRight },
  { id: 'execution_confirmation', label: '実行確認用', icon: Contact },
];

interface ProcessStepsProps {
  steps: ProcessStep[];
  activeStep: string;
  onStepClick: (stepId: string) => void;
}

export const ProcessSteps = ({ activeStep, onStepClick }: ProcessStepsProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max p-6">
        <div className="relative">
          <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-5" />
          <div className="relative z-10 flex justify-between gap-4">
            {progressSteps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = progressSteps.findIndex(s => s.id === activeStep) >= index;
              const isCurrent = step.id === activeStep;
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => onStepClick(step.id)}
                  className="flex flex-col items-center min-w-[100px]"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                      isComplete ? "bg-primary text-primary-foreground" : "bg-gray-200",
                      isCurrent && "ring-4 ring-primary/20"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-600 hidden md:block">
                    {step.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
