
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
  const [careTips, setCareTips] = useState<string[]>([]);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadStorageData();
    setCommands(savedData.commands);
    setDogName(savedData.dogName);
    setOwnerName(savedData.ownerName);
    setCareTips(savedData.careTips);
    
    // If we have data, start from manage step, otherwise start from beginning
    if (savedData.dogName && savedData.commands.length > 0) {
      setCurrentStep('manage');
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveStorageData({ commands, dogName, ownerName, careTips });
  }, [commands, dogName, ownerName, careTips]);

  const handleDogInfoComplete = (name: string, owner: string) => {
    setDogName(name);
    setOwnerName(owner);
    setCurrentStep('add-commands');
  };

  const addCommand = (command: DogCommand) => {
    setCommands([...commands, command]);
    toast({
      title: "Command added successfully ✓",
      description: `'${command.command}' has been registered in the system.`
    });
  };

  const removeCommand = (id: string) => {
    setCommands(commands.filter(cmd => cmd.id !== id));
    toast({
      title: "Command deleted",
      description: "Command has been removed from the database."
    });
  };

  const updateCareTips = (newCareTips: string[]) => {
    setCareTips(newCareTips);
    toast({
      title: "Care tips updated ✓",
      description: "Changes have been saved."
    });
  };

  const handleExportText = () => {
    exportTextGuide(commands, dogName, ownerName, careTips);
    toast({
      title: "Manual exported as TXT ✓",
      description: "File downloaded successfully."
    });
  };

  const handleExportPDF = () => {
    exportPDFGuide(commands, dogName, ownerName, careTips);
    toast({
      title: "Manual exported as PDF ✓",
      description: "File downloaded successfully."
    });
  };

  const handleFinishAdding = () => {
    if (commands.length === 0) {
      toast({
        title: "No commands added",
        description: "Add at least one command before proceeding.",
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
            careTips={careTips}
            onAddCommand={addCommand}
            onRemoveCommand={removeCommand}
            onUpdateCareTips={updateCareTips}
            onExportText={handleExportText}
            onExportPDF={handleExportPDF}
            onStartOver={() => {
              setCurrentStep('dog-info');
              setCommands([]);
              setDogName('');
              setOwnerName('');
              setCareTips([
                'Use a calm, confident voice when giving commands',
                'Always supervise interactions with the dog',
                'If the dog seems anxious or confused, give them space',
                'Contact the owner immediately if any problems arise',
                'Keep emergency contact information handy'
              ]);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <AppHeader />
        
        {/* Terminal-style step indicator */}
        <div className="mb-8">
          <div className="terminal-border border-muted bg-card p-4">
            <div className="text-primary font-mono text-sm">
              &gt; Process status: 
              {currentStep === 'dog-info' && ' [1/4] System configuration'}
              {currentStep === 'add-commands' && ' [2/4] Command registration'}
              {currentStep === 'export' && ' [3/4] Manual compilation'}
              {currentStep === 'manage' && ' [4/4] Runtime management'}
            </div>
            <div className="flex items-center mt-2 space-x-2">
              {['dog-info', 'add-commands', 'export', 'manage'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-2 h-2 ${
                      currentStep === step
                        ? 'bg-primary'
                        : index < ['dog-info', 'add-commands', 'export', 'manage'].indexOf(currentStep)
                        ? 'bg-primary/60'
                        : 'bg-muted'
                    }`}
                  />
                  {index < 3 && (
                    <div
                      className={`w-8 h-px mx-2 ${
                        index < ['dog-info', 'add-commands', 'export', 'manage'].indexOf(currentStep)
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

        {renderCurrentStep()}

        {/* Terminal footer */}
        <div className="text-center mt-12 py-6 border-t border-border">
          <div className="text-muted-foreground font-mono text-sm">
            &gt; mydogmanual.com v1.0.0-beta | Responsible pet care protocol
            <br />
            <span className="text-xs opacity-75">
              # Made for keeping your furry friend safe and happy 🐕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
