
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ArrowRight, Phone, Mail, ChevronDown, ChevronRight, Upload, X } from 'lucide-react';

interface DogInfoStepProps {
  initialDogName: string;
  initialOwnerName: string;
  initialDogPhoto?: string;
  onComplete: (dogName: string, ownerName: string, dogPhoto?: string, emergencyPhone?: string, emergencyEmail?: string) => void;
}

const DogInfoStep: React.FC<DogInfoStepProps> = ({
  initialDogName,
  initialOwnerName,
  initialDogPhoto,
  onComplete
}) => {
  const [dogName, setDogName] = useState(initialDogName);
  const [ownerName, setOwnerName] = useState(initialOwnerName);
  const [dogPhoto, setDogPhoto] = useState<string | undefined>(initialDogPhoto);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dogName.trim()) {
      return;
    }
    onComplete(dogName.trim(), ownerName.trim(), dogPhoto);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDogPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setDogPhoto(undefined);
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

            <div>
              <Label className="text-primary font-mono text-sm mb-2 block">
                DOG_PHOTO= (optional)
              </Label>
              {!dogPhoto ? (
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground font-mono text-sm mb-3">
                    # Upload a photo of your dog
                  </p>
                  <label htmlFor="dogPhoto" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-mono text-sm rounded border border-primary hover:bg-primary/20 transition-colors">
                      <Upload className="w-4 h-4" />
                      SELECT FILE
                    </div>
                  </label>
                  <Input
                    id="dogPhoto"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <p className="text-muted-foreground font-mono text-xs mt-2">
                    # Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={dogPhoto}
                    alt="Dog photo"
                    className="w-full h-48 object-cover rounded-lg border border-muted"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-muted-foreground font-mono text-xs mt-2">
                    # Photo uploaded successfully
                  </p>
                </div>
              )}
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
