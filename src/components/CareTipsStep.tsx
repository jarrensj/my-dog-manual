
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

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
    console.log('Adding tip:', newTip);
    if (newTip.trim()) {
      const updatedTips = [...careTips, newTip.trim()];
      console.log('Updated tips:', updatedTips);
      setCareTips(updatedTips);
      setNewTip('');
    }
  };

  const removeTip = (index: number) => {
    console.log('Removing tip at index:', index);
    const updatedTips = careTips.filter((_, i) => i !== index);
    console.log('Updated tips after removal:', updatedTips);
    setCareTips(updatedTips);
  };

  const handleComplete = () => {
    onComplete(careTips);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeTip(index);
                    }}
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
            <div className="flex gap-2">
              <Textarea
                id="new-tip"
                placeholder="Enter a care tip..."
                value={newTip}
                onChange={(e) => {
                  console.log('Textarea value changing to:', e.target.value);
                  setNewTip(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                className="flex-1 resize-none"
                rows={2}
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addTip();
                }}
                disabled={!newTip.trim()}
                className="self-start shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleComplete}
              className="font-mono"
            >
              Continue &gt;
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareTipsStep;
