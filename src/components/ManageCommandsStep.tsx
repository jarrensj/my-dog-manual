
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, Trash2, FileText, Users, Plus, RotateCcw, Heart } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with dog info and actions */}
      <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
        <CardHeader className="bg-primary/5 text-center pb-6">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary font-light text-xl">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
              {dogName}ちゃんのケアガイド
            </div>
            <div className="flex gap-3">
              <Button
                onClick={onExportText}
                variant="outline"
                size="sm"
                className="sketch-border border-primary/30 bg-background hover:bg-primary/10 text-primary font-normal shadow-none organic-shape"
              >
                <FileText className="w-4 h-4 mr-2" strokeWidth={1.5} />
                TXT
              </Button>
              <Button
                onClick={onExportPDF}
                variant="outline"
                size="sm"
                className="sketch-border border-primary/30 bg-background hover:bg-primary/10 text-primary font-normal shadow-none organic-shape"
              >
                <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
                PDF
              </Button>
            </div>
          </CardTitle>
          <p className="text-sm text-muted-foreground font-light mt-2">
            飼い主: {ownerName || '未設定'} • {commands.length} コマンド
            <br />
            <span className="text-xs opacity-75">
              Owner: {ownerName || 'Not specified'} • {commands.length} commands
            </span>
          </p>
        </CardHeader>
        <CardContent className="zen-spacing">
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-normal sketch-border border-primary/30 organic-shape shadow-none"
            >
              <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
              コマンドを追加 / Add Commands
            </Button>
            <Button
              onClick={onStartOver}
              variant="outline"
              className="sketch-border border-primary/30 bg-background hover:bg-primary/10 text-primary font-normal shadow-none organic-shape"
            >
              <RotateCcw className="w-4 h-4 mr-2" strokeWidth={1.5} />
              最初から / Start Over
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add command form */}
      {showAddForm && (
        <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
          <CardHeader className="bg-accent/30 text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-primary font-light text-xl">
              <Plus className="w-5 h-5" strokeWidth={1.5} />
              新しいコマンド / New Command
            </CardTitle>
          </CardHeader>
          <CardContent className="zen-spacing">
            <div className="space-y-6">
              <div>
                <Label htmlFor="command" className="text-base font-normal text-foreground mb-3 block">
                  コマンド / Command *
                </Label>
                <Input
                  id="command"
                  value={currentCommand.command}
                  onChange={(e) => setCurrentCommand({...currentCommand, command: e.target.value})}
                  placeholder="例: おすわり, まて, おいで"
                  className="sketch-border border-primary/20 bg-background focus:border-primary/40 focus:ring-0"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-normal text-foreground mb-3 block">
                  このコマンドの意味 / Meaning *
                </Label>
                <Textarea
                  id="description"
                  value={currentCommand.description}
                  onChange={(e) => setCurrentCommand({...currentCommand, description: e.target.value})}
                  placeholder="このコマンドで犬がどう反応するか説明してください"
                  className="sketch-border border-primary/20 bg-background focus:border-primary/40 focus:ring-0 min-h-[80px] resize-none"
                />
              </div>

              <div>
                <Label htmlFor="whenToUse" className="text-base font-normal text-foreground mb-3 block">
                  いつ使うか / When to Use (任意)
                </Label>
                <Textarea
                  id="whenToUse"
                  value={currentCommand.whenToUse}
                  onChange={(e) => setCurrentCommand({...currentCommand, whenToUse: e.target.value})}
                  placeholder="例: ご飯の前、興奮している時、散歩中"
                  className="sketch-border border-primary/20 bg-background focus:border-primary/40 focus:ring-0 min-h-[60px] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAddCommand}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-normal sketch-border border-primary/30 organic-shape shadow-none"
                  disabled={!currentCommand.command.trim() || !currentCommand.description.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  追加 / Add
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="sketch-border border-primary/30 bg-background hover:bg-primary/10 text-primary font-normal shadow-none organic-shape"
                >
                  キャンセル / Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commands list */}
      <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
        <CardHeader className="bg-accent/20 text-center pb-6">
          <CardTitle className="text-primary font-light text-xl">
            すべてのコマンド ({commands.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground font-light mt-2">
            All Commands
          </p>
        </CardHeader>
        <CardContent className="zen-spacing">
          {commands.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" strokeWidth={1} />
              <p className="font-light mb-2">まだコマンドがありません。</p>
              <p className="text-sm opacity-75">No commands added yet.</p>
              <p className="text-sm font-light mt-2">「コマンドを追加」をクリックして始めましょう！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {commands.map((command) => (
                <div key={command.id} className="sketch-border border-primary/20 organic-shape p-6 bg-accent/10 relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-normal text-lg text-foreground mb-3">「{command.command}」</h3>
                      <p className="text-muted-foreground mb-2 leading-relaxed">
                        <span className="font-normal">意味 / Meaning:</span> {command.description}
                      </p>
                      {command.whenToUse && (
                        <p className="text-sm text-muted-foreground opacity-75">
                          <span className="font-normal">使用場面 / When to use:</span> {command.whenToUse}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => onRemoveCommand(command.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 organic-shape"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
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
