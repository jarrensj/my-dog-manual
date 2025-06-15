import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Download, Trash2, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DogCommand {
  id: string;
  command: string;
  description: string;
  whenToUse: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const STORAGE_KEY = 'dogCommandGuide';

const Index = () => {
  const [commands, setCommands] = useState<DogCommand[]>([]);
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [currentCommand, setCurrentCommand] = useState({
    command: '',
    description: '',
    whenToUse: '',
    difficulty: 'Easy' as const
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
        description: "Please fill in at least the command name and description.",
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
      whenToUse: '',
      difficulty: 'Easy'
    });

    toast({
      title: "Command Added! 🐕",
      description: `"${newCommand.command}" has been added to your guide.`
    });
  };

  const removeCommand = (id: string) => {
    setCommands(commands.filter(cmd => cmd.id !== id));
    toast({
      title: "Command Removed",
      description: "Command has been removed from your guide."
    });
  };

  const exportGuide = () => {
    if (commands.length === 0) {
      toast({
        title: "No Commands",
        description: "Add some commands before exporting your guide!",
        variant: "destructive"
      });
      return;
    }

    const guideContent = generateGuideContent();
    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dogName || 'My-Dog'}-Command-Guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Guide Exported! 📄",
      description: "Your dog command guide has been downloaded."
    });
  };

  const generateGuideContent = () => {
    const title = `🐕 ${dogName || 'My Dog'}'s Command Guide`;
    const subtitle = ownerName ? `Created by ${ownerName}` : 'Personal Training Guide';
    
    let content = `${title}\n${subtitle}\n${'='.repeat(50)}\n\n`;
    
    content += `This guide contains ${commands.length} command${commands.length !== 1 ? 's' : ''} to help you communicate effectively with ${dogName || 'your dog'}.\n\n`;

    // Group by difficulty
    const easy = commands.filter(cmd => cmd.difficulty === 'Easy');
    const medium = commands.filter(cmd => cmd.difficulty === 'Medium');
    const hard = commands.filter(cmd => cmd.difficulty === 'Hard');

    const addSection = (title: string, commandList: DogCommand[]) => {
      if (commandList.length === 0) return;
      content += `${title}\n${'-'.repeat(title.length)}\n\n`;
      commandList.forEach((cmd, index) => {
        content += `${index + 1}. ${cmd.command.toUpperCase()}\n`;
        content += `   What it does: ${cmd.description}\n`;
        if (cmd.whenToUse.trim()) {
          content += `   When to use: ${cmd.whenToUse}\n`;
        }
        content += '\n';
      });
    };

    addSection('🟢 EASY COMMANDS', easy);
    addSection('🟡 MEDIUM COMMANDS', medium);
    addSection('🔴 ADVANCED COMMANDS', hard);

    content += `\nTips for Success:\n`;
    content += `• Be consistent with your commands\n`;
    content += `• Use positive reinforcement\n`;
    content += `• Practice regularly in short sessions\n`;
    content += `• Always end training on a positive note\n\n`;
    
    content += `Generated with ❤️ by Dog Command Guide Builder\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n`;

    return content;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Dog Command Guide Builder</h1>
            <Heart className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a personalized training guide for your furry friend. Document commands, export your guide, and become the best dog parent!
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
                  About Your Dog
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
                  Add New Command
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="command" className="text-sm font-medium text-gray-700">
                    Command *
                  </Label>
                  <Input
                    id="command"
                    value={currentCommand.command}
                    onChange={(e) => setCurrentCommand({...currentCommand, command: e.target.value})}
                    placeholder="e.g., Sit, Stay, Come"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    What does this command do? *
                  </Label>
                  <Textarea
                    id="description"
                    value={currentCommand.description}
                    onChange={(e) => setCurrentCommand({...currentCommand, description: e.target.value})}
                    placeholder="Describe what your dog should do when given this command"
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="whenToUse" className="text-sm font-medium text-gray-700">
                    When to use this command (Optional)
                  </Label>
                  <Textarea
                    id="whenToUse"
                    value={currentCommand.whenToUse}
                    onChange={(e) => setCurrentCommand({...currentCommand, whenToUse: e.target.value})}
                    placeholder="e.g., Before meals, when greeting visitors, during walks"
                    className="mt-1 min-h-[60px]"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Difficulty Level</Label>
                  <div className="flex gap-2 mt-2">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <Button
                        key={level}
                        variant={currentCommand.difficulty === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentCommand({...currentCommand, difficulty: level as any})}
                        className={currentCommand.difficulty === level ? 
                          "bg-blue-600 hover:bg-blue-700" : 
                          "hover:bg-blue-50"
                        }
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={addCommand}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Command
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
                  <span>Your Commands ({commands.length})</span>
                  {commands.length > 0 && (
                    <Button
                      onClick={exportGuide}
                      variant="secondary"
                      size="sm"
                      className="bg-white text-green-600 hover:bg-green-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Guide
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {commands.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No commands added yet.</p>
                    <p className="text-sm">Start building your dog's guide!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {commands.map((command) => (
                      <div key={command.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg text-gray-800">{command.command}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(command.difficulty)}`}>
                                {command.difficulty}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{command.description}</p>
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

            {/* Quick Stats */}
            {commands.length > 0 && (
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardTitle>Training Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {commands.filter(cmd => cmd.difficulty === 'Easy').length}
                      </div>
                      <div className="text-sm text-gray-600">Easy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {commands.filter(cmd => cmd.difficulty === 'Medium').length}
                      </div>
                      <div className="text-sm text-gray-600">Medium</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {commands.filter(cmd => cmd.difficulty === 'Hard').length}
                      </div>
                      <div className="text-sm text-gray-600">Advanced</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500">
            Made with ❤️ for dog lovers everywhere. Happy training! 🐕
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
