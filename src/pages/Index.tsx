
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DogCommand } from '@/types/dogCommand';
import { loadStorageData, saveStorageData } from '@/utils/storage';
import { exportTextGuide, exportPDFGuide } from '@/utils/exportUtils';
import AppHeader from '@/components/AppHeader';
import DogInfoForm from '@/components/DogInfoForm';
import CommandForm from '@/components/CommandForm';
import CommandsList from '@/components/CommandsList';

const Index = () => {
  const [commands, setCommands] = useState<DogCommand[]>([]);
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [currentCommand, setCurrentCommand] = useState({
    command: '',
    description: '',
    whenToUse: ''
  });
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadStorageData();
    setCommands(savedData.commands);
    setDogName(savedData.dogName);
    setOwnerName(savedData.ownerName);
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveStorageData({ commands, dogName, ownerName });
  }, [commands, dogName, ownerName]);

  const addCommand = () => {
    if (!currentCommand.command.trim() || !currentCommand.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the command name and what it means.",
        variant: "destructive"
      });
      return;
    }

    const newCommand: DogCommand = {
      id: Date.now().toString(),
      ...currentCommand
    };

    setCommands([...commands, newCommand]);
    setCurrentCommand({
      command: '',
      description: '',
      whenToUse: ''
    });

    toast({
      title: "Command Added! 🐕",
      description: `"${newCommand.command}" has been added to the care guide.`
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
    if (commands.length === 0) {
      toast({
        title: "No Commands",
        description: "Add some commands before exporting the care guide!",
        variant: "destructive"
      });
      return;
    }

    exportTextGuide(commands, dogName, ownerName);
    toast({
      title: "Care Guide Exported! 📄",
      description: "Your dog care guide has been downloaded as a text file."
    });
  };

  const handleExportPDF = () => {
    if (commands.length === 0) {
      toast({
        title: "No Commands",
        description: "Add some commands before exporting the care guide!",
        variant: "destructive"
      });
      return;
    }

    exportPDFGuide(commands, dogName, ownerName);
    toast({
      title: "PDF Care Guide Exported! 📄",
      description: "Your dog care guide has been downloaded as a styled PDF."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AppHeader />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="space-y-6">
            <DogInfoForm
              dogName={dogName}
              setDogName={setDogName}
              ownerName={ownerName}
              setOwnerName={setOwnerName}
            />

            <CommandForm
              currentCommand={currentCommand}
              setCurrentCommand={setCurrentCommand}
              onAddCommand={addCommand}
            />
          </div>

          {/* Right Panel - Commands List & Export */}
          <div className="space-y-6">
            <CommandsList
              commands={commands}
              onRemoveCommand={removeCommand}
              onExportText={handleExportText}
              onExportPDF={handleExportPDF}
            />
          </div>
        </div>

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
