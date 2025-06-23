
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, ArrowRight, Terminal, Pencil, Trash } from 'lucide-react';
import { DogCommand } from '@/types/dogCommand';

interface AddCommandsStepProps {
  dogName: string;
  commands: DogCommand[];
  onAddCommand: (command: DogCommand) => void;
  onRemoveCommand?: (id: string) => void;
  onUpdateCommand?: (id: string, updatedCommand: DogCommand) => void;
  onFinish: () => void;
}

const AddCommandsStep: React.FC<AddCommandsStepProps> = ({
  dogName,
  commands,
  onAddCommand,
  onRemoveCommand,
  onUpdateCommand,
  onFinish
}) => {
  const [currentCommand, setCurrentCommand] = useState({
    command: '',
    description: '',
    whenToUse: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCommand, setEditingCommand] = useState({
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

  const handleStartEdit = (command: DogCommand) => {
    setEditingId(command.id);
    setEditingCommand({
      command: command.command,
      description: command.description,
      whenToUse: command.whenToUse
    });
  };

  const handleSaveEdit = () => {
    if (!editingCommand.command.trim() || !editingCommand.description.trim() || !editingId) {
      return;
    }

    const updatedCommand: DogCommand = {
      id: editingId,
      ...editingCommand
    };

    if (onUpdateCommand) {
      onUpdateCommand(editingId, updatedCommand);
    }
    
    setEditingId(null);
    setEditingCommand({
      command: '',
      description: '',
      whenToUse: ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCommand({
      command: '',
      description: '',
      whenToUse: ''
    });
  };

  const handleDelete = (id: string) => {
    if (onRemoveCommand) {
      onRemoveCommand(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="terminal-border border-primary bg-card">
        <div className="terminal-header">
          <span className="text-primary font-bold">command_input.sh</span>
        </div>
        <CardContent className="terminal-spacing">
          <div className="text-primary font-mono mb-6">
            &gt; Adding commands for: {dogName}
            <span className="cursor"></span>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="command" className="text-primary font-mono text-sm mb-2 block">
                COMMAND= <span className="text-destructive">*required</span>
              </Label>
              <Input
                id="command"
                value={currentCommand.command}
                onChange={(e) => setCurrentCommand({...currentCommand, command: e.target.value})}
                placeholder="sit, stay, come, etc."
                className={`terminal-border border-muted bg-input text-foreground font-mono focus:border-primary ${
                  !currentCommand.command.trim() ? 'pulse-required' : ''
                }`}
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-primary font-mono text-sm mb-2 block">
                DESCRIPTION= <span className="text-destructive">*required</span>
              </Label>
              <Textarea
                id="description"
                value={currentCommand.description}
                onChange={(e) => setCurrentCommand({...currentCommand, description: e.target.value})}
                placeholder="Define expected behavior when command is executed"
                className={`terminal-border border-muted bg-input text-foreground font-mono focus:border-primary min-h-[80px] resize-none ${
                  !currentCommand.description.trim() ? 'pulse-required' : ''
                }`}
              />
            </div>

            <div>
              <Label htmlFor="whenToUse" className="text-primary font-mono text-sm mb-2 block">
                USAGE_CONTEXT= (optional)
              </Label>
              <Textarea
                id="whenToUse"
                value={currentCommand.whenToUse}
                onChange={(e) => setCurrentCommand({...currentCommand, whenToUse: e.target.value})}
                placeholder="Before feeding, during walks, when excited, etc."
                className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary min-h-[60px] resize-none"
              />
            </div>

            <Button 
              onClick={handleAddCommand}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold terminal-border border-primary"
              disabled={!currentCommand.command.trim() || !currentCommand.description.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD COMMAND
            </Button>
          </div>
        </CardContent>
      </Card>

      {commands.length > 0 && (
        <Card className="terminal-border border-muted bg-card">
          <div className="terminal-header">
            <span className="text-primary font-bold">command_registry.log</span>
          </div>
          <CardContent className="terminal-spacing">
            <div className="text-primary font-mono mb-4">
              # Registered commands: {commands.length}
            </div>
            <div className="space-y-3 mb-6">
              {commands.map((command) => (
                <div key={command.id} className="terminal-border border-muted bg-accent p-3">
                  {editingId === command.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingCommand.command}
                        onChange={(e) => setEditingCommand({...editingCommand, command: e.target.value})}
                        className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary"
                        placeholder="Command"
                      />
                      <Textarea
                        value={editingCommand.description}
                        onChange={(e) => setEditingCommand({...editingCommand, description: e.target.value})}
                        className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary min-h-[60px] resize-none"
                        placeholder="Description"
                      />
                      <Textarea
                        value={editingCommand.whenToUse}
                        onChange={(e) => setEditingCommand({...editingCommand, whenToUse: e.target.value})}
                        className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary min-h-[50px] resize-none"
                        placeholder="Usage context (optional)"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="font-mono"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={!editingCommand.command.trim() || !editingCommand.description.trim()}
                          className="font-mono"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-primary font-mono font-bold mb-1">
                          &gt; {command.command}
                        </div>
                        <div className="text-foreground font-mono text-sm mb-1">
                          Description: {command.description}
                        </div>
                        {command.whenToUse && (
                          <div className="text-muted-foreground font-mono text-xs">
                            Context: {command.whenToUse}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 ml-3 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStartEdit(command)}
                          className="h-auto p-2 text-muted-foreground hover:text-primary"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(command.id)}
                          className="h-auto p-2 text-muted-foreground hover:text-destructive"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={onFinish}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold py-3 terminal-border border-primary"
            >
              COMPILE MANUAL
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddCommandsStep;
