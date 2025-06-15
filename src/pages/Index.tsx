
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
      title: "コマンドが追加されました 🐕",
      description: `「${command.command}」がケアガイドに追加されました。`
    });
  };

  const removeCommand = (id: string) => {
    setCommands(commands.filter(cmd => cmd.id !== id));
    toast({
      title: "コマンドが削除されました",
      description: "ケアガイドからコマンドが削除されました。"
    });
  };

  const handleExportText = () => {
    exportTextGuide(commands, dogName, ownerName);
    toast({
      title: "ケアガイドをエクスポートしました 📄",
      description: "テキストファイルとしてダウンロードされました。"
    });
  };

  const handleExportPDF = () => {
    exportPDFGuide(commands, dogName, ownerName);
    toast({
      title: "PDFケアガイドをエクスポートしました 📄",
      description: "スタイル付きPDFとしてダウンロードされました。"
    });
  };

  const handleFinishAdding = () => {
    if (commands.length === 0) {
      toast({
        title: "コマンドが追加されていません",
        description: "続行する前に、少なくとも1つのコマンドを追加してください。",
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
    <div className="min-h-screen bg-background relative textured">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <AppHeader />
        
        {/* Minimalist step indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {['dog-info', 'add-commands', 'export', 'manage'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    currentStep === step
                      ? 'bg-primary border-primary'
                      : index < ['dog-info', 'add-commands', 'export', 'manage'].indexOf(currentStep)
                      ? 'bg-primary/60 border-primary/60'
                      : 'bg-background border-muted-foreground/30'
                  }`}
                />
                {index < 3 && (
                  <div
                    className={`w-12 h-px mx-4 ${
                      index < ['dog-info', 'add-commands', 'export', 'manage'].indexOf(currentStep)
                        ? 'bg-primary/60'
                        : 'bg-muted-foreground/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-muted-foreground font-light">
              {currentStep === 'dog-info' && 'ステップ 1: 愛犬の情報'}
              {currentStep === 'add-commands' && 'ステップ 2: コマンドの追加'}
              {currentStep === 'export' && 'ステップ 3: ガイドのエクスポート'}
              {currentStep === 'manage' && 'ステップ 4: コマンドの管理'}
            </span>
          </div>
        </div>

        {renderCurrentStep()}

        {/* Minimalist footer */}
        <div className="text-center mt-16 py-8 border-t border-border/30">
          <p className="text-muted-foreground font-light text-sm leading-relaxed">
            愛犬への責任あるケアのために作られました。
            <br />
            <span className="text-xs opacity-75">
              Made with ❤️ for responsible pet care. Help your caretakers give your dog the best experience! 🐕
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
