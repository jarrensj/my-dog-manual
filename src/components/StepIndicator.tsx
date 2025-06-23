
import React from 'react';
import { FormStep } from '@/hooks/useStepManager';

interface StepIndicatorProps {
  currentStep: FormStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps: FormStep[] = ['dog-info', 'care-tips', 'add-commands', 'export', 'manage'];
  const stepLabels = {
    'dog-info': '[1/5] System configuration',
    'care-tips': '[2/5] Care guidelines setup',
    'add-commands': '[3/5] Command registration',
    'export': '[4/5] Manual compilation',
    'manage': '[5/5] Runtime management'
  };

  return (
    <div className="mb-8">
      <div className="terminal-border border-muted bg-card p-4">
        <div className="text-primary font-mono text-sm">
          &gt; Process status: {stepLabels[currentStep]}
        </div>
        <div className="flex items-center mt-2 space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-2 h-2 ${
                  currentStep === step
                    ? `bg-primary ${currentStep !== 'manage' ? 'animate-pulse' : ''}`
                    : index < steps.indexOf(currentStep)
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-px mx-2 ${
                    index < steps.indexOf(currentStep)
                      ? 'bg-primary/60'
                      : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
