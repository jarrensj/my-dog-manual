
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, ArrowRight, Terminal } from 'lucide-react';
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
