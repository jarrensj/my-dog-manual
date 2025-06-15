
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ArrowRight, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';

interface DogInfoStepProps {
  initialDogName: string;
  initialOwnerName: string;
  onComplete: (dogName: string, ownerName: string, emergencyPhone?: string, emergencyEmail?: string) => void;
}

const DogInfoStep: React.FC<DogInfoStepProps> = ({
  initialDogName,
  initialOwnerName,
  onComplete
}) => {
  const [dogName, setDogName] = useState(initialDogName);
  const [ownerName, setOwnerName] = useState(initialOwnerName);
  // const [emergencyPhone, setEmergencyPhone] = useState('');
  // const [emergencyEmail, setEmergencyEmail] = useState('');
  // const [isEmergencyExpanded, setIsEmergencyExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dogName.trim()) {
      return;
    }
    onComplete(dogName.trim(), ownerName.trim());
  };

  // const toggleEmergencySection = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log('Emergency section clicked, current state:', isEmergencyExpanded);
  //   setIsEmergencyExpanded(!isEmergencyExpanded);
  // };

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

            {/* Emergency contact section - commented out for now */}
            {/*
            <div className="border-t border-border pt-6">
              <button 
                type="button"
                onClick={toggleEmergencySection}
                className="flex items-center gap-2 text-primary font-mono hover:text-primary/80 transition-colors cursor-pointer p-2 -ml-2 rounded hover:bg-muted/20 select-none w-full text-left bg-transparent border-none outline-none"
              >
                {isEmergencyExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                &gt; Emergency contact configuration (optional)...
              </button>
              
              {isEmergencyExpanded && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="emergencyPhone" className="text-primary font-mono text-sm mb-2 block flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      EMERGENCY_PHONE= (optional)
                    </Label>
                    <Input
                      id="emergencyPhone"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="Enter emergency contact number"
                      className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary"
                    />
                    <p className="text-muted-foreground font-mono text-xs mt-1">
                      # For urgent situations requiring immediate assistance
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="emergencyEmail" className="text-primary font-mono text-sm mb-2 block flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      EMERGENCY_EMAIL= (optional)
                    </Label>
                    <Input
                      id="emergencyEmail"
                      type="email"
                      value={emergencyEmail}
                      onChange={(e) => setEmergencyEmail(e.target.value)}
                      placeholder="Enter emergency contact email"
                      className="terminal-border border-muted bg-input text-foreground font-mono focus:border-primary"
                    />
                    <p className="text-muted-foreground font-mono text-xs mt-1">
                      # Secondary contact method for emergency notifications
                    </p>
                  </div>
                </div>
              )}
            </div>
            */}

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
