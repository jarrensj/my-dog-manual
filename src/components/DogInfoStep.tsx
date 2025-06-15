
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ArrowRight } from 'lucide-react';

interface DogInfoStepProps {
  initialDogName: string;
  initialOwnerName: string;
  onComplete: (dogName: string, ownerName: string) => void;
}

const DogInfoStep: React.FC<DogInfoStepProps> = ({
  initialDogName,
  initialOwnerName,
  onComplete
}) => {
  const [dogName, setDogName] = useState(initialDogName);
  const [ownerName, setOwnerName] = useState(initialOwnerName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dogName.trim()) {
      return;
    }
    onComplete(dogName.trim(), ownerName.trim());
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card className="terminal-border border-primary bg-card">
        <div className="terminal-header">
          <span className="text-primary font-bold">setup.cfg</span>
        </div>
        <CardContent className="terminal-spacing">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-primary font-mono mb-4">
              &gt; Configuring canine parameters...
            </div>
            
            <div>
              <Label htmlFor="dogName" className="text-primary font-mono text-sm mb-2 block">
                DOG_NAME= <span className="text-destructive">*required</span>
              </Label>
              <Input
                id="dogName"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="Enter dog identifier"
                className={`terminal-border border-muted bg-input text-foreground font-mono focus:border-primary ${
                  !dogName.trim() ? 'pulse-required' : ''
                }`}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="ownerName" className="text-primary font-mono text-sm mb-2 block">
                OWNER_NAME= (optional)
              </Label>
              <Input
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter owner identifier"
                className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary"
              />
              <p className="text-muted-foreground font-mono text-xs mt-1">
                # Will be included in generated manual
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold py-3 terminal-border border-primary"
              disabled={!dogName.trim()}
            >
              EXECUTE SETUP
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DogInfoStep;
