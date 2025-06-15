
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Download, Trash2, Heart, FileText, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface DogCommand {
  id: string;
  command: string;
  description: string;
  whenToUse: string;
}

const STORAGE_KEY = 'dogCareGuide';

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
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCommands(parsed.commands || []);
        setDogName(parsed.dogName || '');
        setOwnerName(parsed.ownerName || '');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      commands,
      dogName,
      ownerName
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
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

  const exportGuide = () => {
    if (commands.length === 0) {
      toast({
        title: "No Commands",
        description: "Add some commands before exporting the care guide!",
        variant: "destructive"
      });
      return;
    }

    const guideContent = generateGuideContent();
    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dogName || 'Dog'}-Care-Guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Care Guide Exported! 📄",
      description: "Your dog care guide has been downloaded as a text file."
    });
  };

  const exportPDF = () => {
    if (commands.length === 0) {
      toast({
        title: "No Commands",
        description: "Add some commands before exporting the care guide!",
        variant: "destructive"
      });
      return;
    }

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      pdf.setTextColor(color);
      
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
      
      // Check if we need a new page
      if (yPosition + (lines.length * fontSize * 0.5) > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * fontSize * 0.5 + 5;
    };

    // Header
    addText(`🐕 ${dogName || 'Dog'} Care Guide`, 24, true, '#2563eb');
    if (ownerName) {
      addText(`Owner: ${ownerName}`, 14, false, '#6b7280');
    }
    addText(`For Babysitters & Caretakers`, 16, true, '#7c3aed');
    addText(`Generated on ${new Date().toLocaleDateString()}`, 12, false, '#9ca3af');
    
    yPosition += 10;

    // Introduction
    addText(`This guide contains important information about ${dogName || 'this dog'} to help you provide the best care. Please read through all commands and instructions before interacting with ${dogName || 'the dog'}.`, 12);
    
    yPosition += 10;

    // Commands list
    addText('🗣️ COMMANDS & RESPONSES', 16, true, '#7c3aed');
    
    commands.forEach((cmd, index) => {
      addText(`${index + 1}. "${cmd.command.toUpperCase()}"`, 14, true);
      addText(`What this means: ${cmd.description}`, 11);
      if (cmd.whenToUse.trim()) {
        addText(`When to use this: ${cmd.whenToUse}`, 11, false, '#6b7280');
      }
      yPosition += 5;
    });

    // Care tips section
    yPosition += 10;
    addText('Important Care Tips:', 16, true, '#7c3aed');
    addText('• Use a calm, confident voice when giving commands', 11);
    addText(`• Always supervise interactions with ${dogName || 'the dog'}`, 11);
    addText('• If the dog seems anxious or confused, give them space', 11);
    addText('• Contact the owner immediately if any problems arise', 11);
    addText('• Keep emergency contact information handy', 11);

    // Footer
    yPosition += 15;
    addText('Generated with ❤️ by Dog Care Guide Builder', 10, false, '#9ca3af');

    // Save the PDF
    pdf.save(`${dogName || 'Dog'}-Care-Guide.pdf`);

    toast({
      title: "PDF Care Guide Exported! 📄",
      description: "Your dog care guide has been downloaded as a styled PDF."
    });
  };

  const generateGuideContent = () => {
    const title = `🐕 ${dogName || 'Dog'} Care Guide for Babysitters & Caretakers`;
    const subtitle = ownerName ? `Owner: ${ownerName}` : 'Dog Care Instructions';
    
    let content = `${title}\n${subtitle}\n${'='.repeat(60)}\n\n`;
    
    content += `This guide contains important information about ${dogName || 'this dog'} to help you provide the best care.\n`;
    content += `Please read through all commands and instructions before interacting with ${dogName || 'the dog'}.\n\n`;

    // Commands list
    content += `🗣️ COMMANDS & RESPONSES\n${'-'.repeat(25)}\n\n`;
    commands.forEach((cmd, index) => {
      content += `${index + 1}. "${cmd.command.toUpperCase()}"\n`;
      content += `   What this means: ${cmd.description}\n`;
      if (cmd.whenToUse.trim()) {
        content += `   When to use this: ${cmd.whenToUse}\n`;
      }
      content += '\n';
    });

    content += `\nIMPORTANT CARE TIPS:\n`;
    content += `• Use a calm, confident voice when giving commands\n`;
    content += `• Always supervise interactions with ${dogName || 'the dog'}\n`;
    content += `• If the dog seems anxious or confused, give them space\n`;
    content += `• Contact the owner immediately if any problems arise\n`;
    content += `• Keep emergency contact information handy\n\n`;
    
    content += `Generated with ❤️ by Dog Care Guide Builder\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n`;

    return content;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Dog Care Guide Builder</h1>
            <Heart className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a comprehensive care guide for babysitters, pet sitters, and caretakers. Help them understand how to communicate with your dog and provide the best care while you're away.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="space-y-6">
            {/* Dog & Owner Info */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Dog & Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="dogName" className="text-sm font-medium text-gray-700">
                    Dog's Name
                  </Label>
                  <Input
                    id="dogName"
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                    placeholder="e.g., Max, Bella, Charlie"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
                    Your Name (Optional)
                  </Label>
                  <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Command Form */}
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Command or Instruction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="command" className="text-sm font-medium text-gray-700">
                    Command or Phrase *
                  </Label>
                  <Input
                    id="command"
                    value={currentCommand.command}
                    onChange={(e) => setCurrentCommand({...currentCommand, command: e.target.value})}
                    placeholder="e.g., Sit, Stay, Come, Good boy/girl"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    What does this command mean? *
                  </Label>
                  <Textarea
                    id="description"
                    value={currentCommand.description}
                    onChange={(e) => setCurrentCommand({...currentCommand, description: e.target.value})}
                    placeholder="Explain what the dog should do or how they typically respond to this command"
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="whenToUse" className="text-sm font-medium text-gray-700">
                    When should a caretaker use this? (Optional)
                  </Label>
                  <Textarea
                    id="whenToUse"
                    value={currentCommand.whenToUse}
                    onChange={(e) => setCurrentCommand({...currentCommand, whenToUse: e.target.value})}
                    placeholder="e.g., Before feeding, when the dog is excited, during walks, for bedtime routine"
                    className="mt-1 min-h-[60px]"
                  />
                </div>

                <Button 
                  onClick={addCommand}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Care Guide
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Commands List & Export */}
          <div className="space-y-6">
            {/* Commands List */}
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Care Instructions ({commands.length})</span>
                  {commands.length > 0 && (
                    <div className="flex gap-2">
                      <Button
                        onClick={exportGuide}
                        variant="secondary"
                        size="sm"
                        className="bg-white text-green-600 hover:bg-green-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export TXT
                      </Button>
                      <Button
                        onClick={exportPDF}
                        variant="secondary"
                        size="sm"
                        className="bg-white text-green-600 hover:bg-green-50"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {commands.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No instructions added yet.</p>
                    <p className="text-sm">Start building your dog's care guide!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {commands.map((command) => (
                      <div key={command.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">"{command.command}"</h3>
                            <p className="text-gray-600 mb-2"><span className="font-medium">Meaning:</span> {command.description}</p>
                            {command.whenToUse && (
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">When to use:</span> {command.whenToUse}
                              </p>
                            )}
                          </div>
                          <Button
                            onClick={() => removeCommand(command.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
