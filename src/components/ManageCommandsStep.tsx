
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, Trash2, FileText, Plus, RotateCcw, Terminal } from 'lucide-react';
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
      <Card className="terminal-border border-primary bg-card">
        <div className="terminal-header">
          <span className="text-primary font-bold">care_manual_manager.exe</span>
        </div>
        <CardContent className="terminal-spacing">
          <div className="flex items-center justify-between mb-4">
            <div className="text-primary font-mono">
              &gt; Managing: {dogName}
              <br />
              &gt; Owner: {ownerName || 'undefined'}
              <br />
              &gt; Commands loaded: {commands.length}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onExportText}
                variant="outline"
                size="sm"
                className="terminal-border border-muted bg-input text-foreground font-mono hover:border-primary"
              >
                <FileText className="w-4 h-4 mr-1" />
                TXT
              </Button>
              <Button
                onClick={onExportPDF}
                variant="outline"
                size="sm"
                className="terminal-border border-muted bg-input text-foreground font-mono hover:border-primary"
              >
                <Download className="w-4 h-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold terminal-border border-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD COMMAND
            </Button>
            <Button
              onClick={onStartOver}
              variant="outline"
              className="terminal-border border-muted bg-input text-foreground font-mono hover:border-primary"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              RESTART
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add command form */}
      {showAddForm && (
        <Card className="terminal-border border-muted bg-card">
          <div className="terminal-header">
            <span className="text-primary font-bold">new_command.cfg</span>
          </div>
          <CardContent className="terminal-spacing">
            <div className="space-y-4">
              <div>
                <Label htmlFor="command" className="text-primary font-mono text-sm mb-2 block">
                  COMMAND= <span className="text-destructive">*required</span>
                </Label>
                <Input
                  id="command"
                  value={currentCommand.command}
                  onChange={(e) => setCurrentCommand({...currentCommand, command: e.target.value})}
                  placeholder="Enter command"
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
                  placeholder="Define expected behavior"
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
                  placeholder="When to use this command"
                  className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary min-h-[60px] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAddCommand}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold terminal-border border-primary"
                  disabled={!currentCommand.command.trim() || !currentCommand.description.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  ADD
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="terminal-border border-muted bg-input text-foreground font-mono hover:border-primary"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commands list */}
      <Card className="terminal-border border-muted bg-card">
        <div className="terminal-header">
          <span className="text-primary font-bold">command_database.db</span>
        </div>
        <CardContent className="terminal-spacing">
          {commands.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground font-mono">
              <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <div>&gt; No commands in database</div>
              <div className="text-xs mt-2"># Use ADD COMMAND to initialize</div>
            </div>
          ) : (
            <div className="space-y-3">
              {commands.map((command) => (
                <div key={command.id} className="terminal-border border-muted bg-accent p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-primary font-mono font-bold mb-2">
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
                    <Button
                      onClick={() => onRemoveCommand(command.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 font-mono"
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
