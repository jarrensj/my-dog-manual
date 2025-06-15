
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, Trash2, FileText, Users, Plus, RotateCcw } from 'lucide-react';
import { DogCommand } from '@/types/dogCommand';

interface ManageCommandsStepProps {
  dogName: string;
  ownerName: string;
  commands: DogCommand[];
  onAddCommand: (command: DogCommand) => void;
  onRemoveCommand: (id: string) => void;
  onExportText: () => void;
  onExportPDF: () => void;
  onStartOver: () => void;
}

const ManageCommandsStep: React.FC<ManageCommandsStepProps> = ({
  dogName,
  ownerName,
  commands,
  onAddCommand,
  onRemoveCommand,
  onExportText,
  onExportPDF,
  onStartOver
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
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
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with dog info and actions */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>{dogName}'s Care Guide</span>
            <div className="flex gap-2">
              <Button
                onClick={onExportText}
                variant="secondary"
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export TXT
              </Button>
              <Button
                onClick={onExportPDF}
                variant="secondary"
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Owner: {ownerName || 'Not specified'} • {commands.length} commands
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add More Commands
              </Button>
              <Button
                onClick={onStartOver}
                variant="outline"
                className="text-gray-600 hover:text-gray-800"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add command form */}
      {showAddForm && (
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

            <div className="flex gap-2">
              <Button 
                onClick={handleAddCommand}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium"
                disabled={!currentCommand.command.trim() || !currentCommand.description.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Command
              </Button>
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commands list */}
      <Card className="border-2 border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardTitle>All Commands ({commands.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {commands.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No commands added yet.</p>
              <p className="text-sm">Click "Add More Commands" to get started!</p>
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
                      onClick={() => onRemoveCommand(command.id)}
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
  );
};

export default ManageCommandsStep;
