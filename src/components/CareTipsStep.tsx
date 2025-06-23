
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, ArrowRight } from 'lucide-react';

interface CareTipsStepProps {
  initialCareTips: string[];
  onComplete: (careTips: string[]) => void;
}

const CareTipsStep: React.FC<CareTipsStepProps> = ({ initialCareTips, onComplete }) => {
  const [careTips, setCareTips] = useState<string[]>(
    initialCareTips.length > 0 ? initialCareTips : [
      'Use a calm, confident voice when giving commands',
      'Always supervise interactions with the dog',
      'If the dog seems anxious or confused, give them space',
      'Contact the owner immediately if any problems arise',
      'Keep emergency contact information handy'
    ]
  );
  const [newTip, setNewTip] = useState('');

  const addTip = () => {
    if (newTip.trim()) {
      setCareTips([...careTips, newTip.trim()]);
      setNewTip('');
    }
  };

  const removeTip = (index: number) => {
    setCareTips(careTips.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    onComplete(careTips);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTip();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="text-primary font-mono">
            &gt; Configure care guidelines
          </CardTitle>
          <CardDescription className="font-mono text-muted-foreground">
            # Set up important care instructions for dog sitters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-mono text-muted-foreground">
              Current care tips:
            </Label>
            <div className="space-y-2">
              {careTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-md">
                  <span className="text-sm flex-1">{tip}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTip(index)}
                    className="h-auto p-1 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="new-tip" className="text-sm font-mono text-muted-foreground">
              Add new care tip:
            </Label>
            <div className="flex gap-3">
              <Textarea
                id="new-tip"
                placeholder="Enter a care tip..."
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 resize-none min-h-[80px]"
                rows={2}
              />
              <Button
                variant="outline"
                onClick={addTip}
                disabled={!newTip.trim()}
                className="self-start shrink-0 gap-2 font-mono"
              >
                <Plus className="h-4 w-4" />
                Add Care Tip
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              # Press Enter to add tip, or click the "Add Care Tip" button above
            </p>
          </div>

          {/* Visual separator */}
          <div className="border-t border-border pt-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground font-mono">
                # Ready to proceed to command setup
              </p>
              <Button 
                onClick={handleComplete}
                className="font-mono gap-2"
              >
                Next: Add Commands
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareTipsStep;
