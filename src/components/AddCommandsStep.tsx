
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
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
        <CardHeader className="bg-primary/5 text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-primary font-light text-xl">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
            {dogName}ちゃんのコマンド
          </CardTitle>
          <p className="text-sm text-muted-foreground font-light mt-2">
            Commands for {dogName}
          </p>
        </CardHeader>
        <CardContent className="zen-spacing">
          <p className="text-muted-foreground mb-8 text-center font-light leading-relaxed">
            ペットシッターさんが{dogName}ちゃんとコミュニケーションを取るための
            <br />
            コマンドや指示を追加してください。
          </p>
          
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

            <Button 
              onClick={handleAddCommand}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-normal py-3 sketch-border border-primary/30 organic-shape shadow-none"
              disabled={!currentCommand.command.trim() || !currentCommand.description.trim()}
            >
              <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
              コマンドを追加 / Add Command
            </Button>
          </div>
        </CardContent>
      </Card>

      {commands.length > 0 && (
        <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
          <CardHeader className="bg-accent/30 text-center pb-6">
            <CardTitle className="text-primary font-light text-lg">
              追加されたコマンド ({commands.length})
            </CardTitle>
            <p className="text-sm text-muted-foreground font-light">
              Added Commands
            </p>
          </CardHeader>
          <CardContent className="zen-spacing">
            <div className="space-y-4 mb-8">
              {commands.map((command) => (
                <div key={command.id} className="sketch-border border-primary/20 organic-shape p-4 bg-accent/10">
                  <h4 className="font-normal text-foreground mb-2">「{command.command}」</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-normal">意味:</span> {command.description}
                  </p>
                  {command.whenToUse && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-normal">使用場面:</span> {command.whenToUse}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={onFinish}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-normal py-4 text-base sketch-border border-primary/30 organic-shape shadow-none"
            >
              完了 / I'm Done Adding Commands
              <ArrowRight className="w-5 h-5 ml-2" strokeWidth={1.5} />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddCommandsStep;
