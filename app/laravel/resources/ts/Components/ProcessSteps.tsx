import { Check, ArrowRight, User, FileText, Contact } from "lucide-react";
import { motion } from 'framer-motion';
import { ProcessStep } from '@/types/process';
import { cn } from "@/lib/utils";

const progressSteps = [
  { id: 'inquiry', label: '問い合わせ済', icon: FileText },
  { id: 'phone_confirmed', label: '確認電話済', icon: Check },
  { id: 'fp_attended', label: 'FPアテンド済', icon: User },
  { id: 'schedule_adjusted', label: '日程調整済', icon: ArrowRight },
  { id: 'first_meeting', label: '初回面談', icon: User },
  { id: 'multiple_meetings', label: '複数面談', icon: User },
  { id: 'contracted', label: '契約済', icon: Contact }, // Changed from Contract to Contact
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
