
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DogCommand } from '@/types/dogCommand';
import { loadStorageData, saveStorageData } from '@/utils/storage';
import { exportTextGuide, exportPDFGuide } from '@/utils/exportUtils';
import AppHeader from '@/components/AppHeader';
import DogInfoStep from '@/components/DogInfoStep';
import AddCommandsStep from '@/components/AddCommandsStep';
import ExportStep from '@/components/ExportStep';
import ManageCommandsStep from '@/components/ManageCommandsStep';

type FormStep = 'dog-info' | 'add-commands' | 'export' | 'manage';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('dog-info');
  const [commands, setCommands] = useState<DogCommand[]>([]);
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadStorageData();
    setCommands(savedData.commands);
    setDogName(savedData.dogName);
    setOwnerName(savedData.ownerName);
    
    // If we have data, start from manage step, otherwise start from beginning
    if (savedData.dogName && savedData.commands.length > 0) {
      setCurrentStep('manage');
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveStorageData({ commands, dogName, ownerName });
  }, [commands, dogName, ownerName]);

  const handleDogInfoComplete = (name: string, owner: string) => {
    setDogName(name);
    setOwnerName(owner);
    setCurrentStep('add-commands');
  };

  const addCommand = (command: DogCommand) => {
    setCommands([...commands, command]);
    toast({
      title: "Command Added! 🐕",
      description: `"${command.command}" has been added to the care guide.`
    });
  };

  const removeCommand = (id: string) => {
    setCommands(commands.filter(cmd => cmd.id !== id));
    toast({
      title: "Command Removed",
      description: "Command has been removed from the care guide."
    });
  };

  const handleExportText = () => {
    exportTextGuide(commands, dogName, ownerName);
    toast({
      title: "Care Guide Exported! 📄",
      description: "Your dog care guide has been downloaded as a text file."
    });
  };

  const handleExportPDF = () => {
    exportPDFGuide(commands, dogName, ownerName);
    toast({
      title: "PDF Care Guide Exported! 📄",
      description: "Your dog care guide has been downloaded as a styled PDF."
    });
  };

  const handleFinishAdding = () => {
    if (commands.length === 0) {
      toast({
        title: "No Commands Added",
        description: "Please add at least one command before proceeding.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('export');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'dog-info':
        return (
          <DogInfoStep
            initialDogName={dogName}
            initialOwnerName={ownerName}
            onComplete={handleDogInfoComplete}
          />
        );
      case 'add-commands':
        return (
          <AddCommandsStep
            dogName={dogName}
            commands={commands}
            onAddCommand={addCommand}
            onFinish={handleFinishAdding}
          />
        );
      case 'export':
        return (
          <ExportStep
            dogName={dogName}
            commandCount={commands.length}
            onExportText={handleExportText}
            onExportPDF={handleExportPDF}
            onContinueToManage={() => setCurrentStep('manage')}
          />
        );
      case 'manage':
        return (
          <ManageCommandsStep
            dogName={dogName}
            ownerName={ownerName}
            commands={commands}
            onAddCommand={addCommand}
            onRemoveCommand={removeCommand}
            onExportText={handleExportText}
            onExportPDF={handleExportPDF}
            onStartOver={() => {
              setCurrentStep('dog-info');
              setCommands([]);
              setDogName('');
              setOwnerName('');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AppHeader />
        
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {['dog-info', 'add-commands', 'export', 'manage'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step
                      ? 'bg-blue-500 text-white'
                      : index < ['dog-info', 'add-commands', 'export', 'manage'].indexOf(currentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      index < ['dog-info', 'add-commands', 'export', 'manage'].indexOf(currentStep)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {currentStep === 'dog-info' && 'Step 1: Dog Information'}
              {currentStep === 'add-commands' && 'Step 2: Add Commands'}
              {currentStep === 'export' && 'Step 3: Export Guide'}
              {currentStep === 'manage' && 'Step 4: Manage Commands'}
            </span>
          </div>
        </div>

        {renderCurrentStep()}

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500">
            Made with ❤️ for responsible pet care. Help your caretakers give your dog the best experience! 🐕
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
