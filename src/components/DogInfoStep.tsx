
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, ArrowRight } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6" />
            Let's Start with Your Dog's Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="dogName" className="text-lg font-medium text-gray-700 mb-2 block">
                What's your dog's name? *
              </Label>
              <Input
                id="dogName"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="e.g., Max, Bella, Charlie"
                className="text-lg py-3"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="ownerName" className="text-lg font-medium text-gray-700 mb-2 block">
                Your name (optional)
              </Label>
              <Input
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Your name"
                className="text-lg py-3"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will appear on the care guide for the babysitter/caretaker
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-lg"
              disabled={!dogName.trim()}
            >
              Continue to Add Commands
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DogInfoStep;
