
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DogCommand } from '@/types/dogCommand';
import { loadStorageData, saveStorageData } from '@/utils/storage';
import { exportTextGuide, exportPDFGuide } from '@/utils/exportUtils';
import { Github } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import DogInfoStep from '@/components/DogInfoStep';
import AddCommandsStep from '@/components/AddCommandsStep';
import ExportStep from '@/components/ExportStep';
import ManageCommandsStep from '@/components/ManageCommandsStep';
import CareTipsStep from '@/components/CareTipsStep';

type FormStep = 'dog-info' | 'care-tips' | 'add-commands' | 'export' | 'manage';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('dog-info');
  const [commands, setCommands] = useState<DogCommand[]>([]);
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [dogPhoto, setDogPhoto] = useState<string | undefined>();
  const [careTips, setCareTips] = useState<string[]>([]);
  const [emergencyPhone, setEmergencyPhone] = useState<string | undefined>();
  const [emergencyEmail, setEmergencyEmail] = useState<string | undefined>();
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadStorageData();
    setCommands(savedData.commands);
    setDogName(savedData.dogName);
    setOwnerName(savedData.ownerName);
    setDogPhoto(savedData.dogPhoto);
    setCareTips(savedData.careTips);
    setEmergencyPhone(savedData.emergencyPhone);
    setEmergencyEmail(savedData.emergencyEmail);
    
    // If we have data, start from manage step, otherwise start from beginning
    if (savedData.dogName && savedData.commands.length > 0) {
      setCurrentStep('manage');
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveStorageData({ commands, dogName, ownerName, dogPhoto, careTips, emergencyPhone, emergencyEmail });
  }, [commands, dogName, ownerName, dogPhoto, careTips, emergencyPhone, emergencyEmail]);

  const handleDogInfoComplete = (name: string, owner: string, photo?: string, phone?: string, email?: string) => {
    setDogName(name);
    setOwnerName(owner);
    setDogPhoto(photo);
    setEmergencyPhone(phone);
    setEmergencyEmail(email);
    setCurrentStep('care-tips');
  };

  const handleCareTipsComplete = (newCareTips: string[]) => {
    setCareTips(newCareTips);
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

  const updateCommand = (id: string, updatedCommand: DogCommand) => {
    setCommands(commands.map(cmd => cmd.id === id ? updatedCommand : cmd));
    toast({
      title: "Command updated ✓",
      description: `'${updatedCommand.command}' has been updated successfully.`
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
    exportTextGuide(commands, dogName, ownerName, careTips, emergencyPhone, emergencyEmail);
    toast({
      title: "Manual exported as TXT ✓",
      description: "File downloaded successfully."
    });
  };

  const handleExportPDF = () => {
    exportPDFGuide(commands, dogName, ownerName, careTips, emergencyPhone, emergencyEmail, dogPhoto);
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
            initialDogPhoto={dogPhoto}
            onComplete={handleDogInfoComplete}
          />
        );
      case 'care-tips':
        return (
          <CareTipsStep
            initialCareTips={careTips}
            onComplete={handleCareTipsComplete}
          />
        );
      case 'add-commands':
        return (
          <AddCommandsStep
            dogName={dogName}
            commands={commands}
            onAddCommand={addCommand}
            onRemoveCommand={removeCommand}
            onUpdateCommand={updateCommand}
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
              setDogPhoto(undefined);
              setEmergencyPhone(undefined);
              setEmergencyEmail(undefined);
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
        
        {/* Terminal-style step indicator with standardized padding */}
        <div className="mb-8">
          <div className="terminal-border border-muted bg-card p-6">
            <div className="text-primary font-mono text-sm mb-3">
              &gt; Process status: 
              {currentStep === 'dog-info' && ' [1/5] System configuration'}
              {currentStep === 'care-tips' && ' [2/5] Care guidelines setup'}
              {currentStep === 'add-commands' && ' [3/5] Command registration'}
              {currentStep === 'export' && ' [4/5] Manual compilation'}
              {currentStep === 'manage' && ' [5/5] Runtime management'}
            </div>
            <div className="flex items-center space-x-2">
              {['dog-info', 'care-tips', 'add-commands', 'export', 'manage'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-2 h-2 ${
                      currentStep === step
                        ? `bg-primary ${currentStep !== 'manage' ? 'animate-pulse' : ''}`
                        : index < ['dog-info', 'care-tips', 'add-commands', 'export', 'manage'].indexOf(currentStep)
                        ? 'bg-primary/60'
                        : 'bg-muted'
                    }`}
                  />
                  {index < 4 && (
                    <div
                      className={`w-8 h-px mx-2 ${
                        index < ['dog-info', 'care-tips', 'add-commands', 'export', 'manage'].indexOf(currentStep)
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
          <div className="mt-4">
            <a 
              href="https://github.com/jarrensj/my-dog-manual" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
