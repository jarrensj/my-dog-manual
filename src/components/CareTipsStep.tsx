import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTip();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="terminal-border border-primary bg-card">
        <div className="terminal-header">
          <span className="text-primary font-bold">care_tips.cfg</span>
        </div>
        <CardContent className="terminal-spacing">
          <div className="text-primary font-mono mb-6">
            &gt; Configuring care guidelines for dog sitters
            <span className="cursor"></span>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label className="text-primary font-mono text-sm mb-3 block">
                CURRENT_CARE_TIPS= ({careTips.length})
              </Label>
              <div className="space-y-3">
                {careTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-accent border border-muted rounded-md">
                    <span className="text-sm flex-1 text-foreground font-mono leading-relaxed">{tip}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeTip(index);
                      }}
                      className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors shrink-0"
                      style={{ zIndex: 1001, position: 'relative' }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="new-tip" className="text-primary font-mono text-sm mb-3 block">
                ADD_NEW_TIP=
              </Label>
              <div className="flex gap-3">
                <Textarea
                  id="new-tip"
                  placeholder="Enter a new care tip..."
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none min-h-[80px] w-full rounded-md border border-muted bg-input px-4 py-3 text-sm text-foreground font-mono focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={3}
                  style={{ zIndex: 1000, position: 'relative' }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addTip();
                  }}
                  disabled={!newTip.trim()}
                  className="self-start shrink-0 h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ zIndex: 1001, position: 'relative' }}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-muted">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleComplete();
                }}
                className="font-mono h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center gap-2"
                style={{ zIndex: 1001, position: 'relative' }}
              >
                CONTINUE &gt;
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareTipsStep;
