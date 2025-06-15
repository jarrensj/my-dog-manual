
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, ArrowRight, Heart } from 'lucide-react';
import { DogCommand } from '@/types/dogCommand';

interface AddCommandsStepProps {
  dogName: string;
  commands: DogCommand[];
  onAddCommand: (command: DogCommand) => void;
  onFinish: () => void;
}

const AddCommandsStep: React.FC<AddCommandsStepProps> = ({
  dogName,
  commands,
  onAddCommand,
  onFinish
}) => {
  const [currentCommand, setCurrentCommand] = useState({
    command: '',
    description: '',
    whenToUse: ''
  });

  const handleAddCommand = () => {
    if (!currentCommand.command.trim() || !currentCommand.description.trim()) {
      return;
    }

    const newCommand: DogCommand = {
      id: Date.now().toString(),
      ...currentCommand
    };

    onAddCommand(newCommand);
    setCurrentCommand({
      command: '',
      description: '',
      whenToUse: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6" />
            Add Commands for {dogName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-gray-600 mb-6 text-center">
            Add commands, phrases, or instructions that will help a babysitter or caretaker communicate with {dogName}.
          </p>
          
          <div className="space-y-4">
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
              onClick={handleAddCommand}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2"
              disabled={!currentCommand.command.trim() || !currentCommand.description.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Command
            </Button>
          </div>
        </CardContent>
      </Card>

      {commands.length > 0 && (
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardTitle className="text-center">
              Commands Added ({commands.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 mb-4">
              {commands.map((command) => (
                <div key={command.id} className="border rounded-lg p-3 bg-white shadow-sm">
                  <h4 className="font-semibold text-gray-800">"{command.command}"</h4>
                  <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Meaning:</span> {command.description}</p>
                  {command.whenToUse && (
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">When to use:</span> {command.whenToUse}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={onFinish}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-2 border-green-400"
            >
              I'm Done Adding Commands
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddCommandsStep;
