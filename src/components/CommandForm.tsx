
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface CommandFormProps {
  currentCommand: {
    command: string;
    description: string;
    whenToUse: string;
  };
  setCurrentCommand: (command: {
    command: string;
    description: string;
    whenToUse: string;
  }) => void;
  onAddCommand: () => void;
}

const CommandForm: React.FC<CommandFormProps> = ({
  currentCommand,
  setCurrentCommand,
  onAddCommand
}) => {
  return (
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
          onClick={onAddCommand}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Care Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommandForm;
