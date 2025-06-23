
import { useState } from 'react';

export type FormStep = 'dog-info' | 'care-tips' | 'add-commands' | 'export' | 'manage';

export const useStepManager = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('dog-info');

  const goToNextStep = () => {
    switch (currentStep) {
      case 'dog-info':
        setCurrentStep('care-tips');
        break;
      case 'care-tips':
        setCurrentStep('add-commands');
        break;
      case 'add-commands':
        setCurrentStep('export');
        break;
      case 'export':
        setCurrentStep('manage');
        break;
      default:
        break;
    }
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  return {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToStep,
  };
};
