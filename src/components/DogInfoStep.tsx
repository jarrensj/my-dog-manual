
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
    <div className="max-w-xl mx-auto">
      <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
        <CardHeader className="bg-primary/5 text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-primary font-light text-xl">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
            愛犬の情報
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </CardTitle>
          <p className="text-sm text-muted-foreground font-light mt-2">
            Dog's Information
          </p>
        </CardHeader>
        <CardContent className="zen-spacing">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label htmlFor="dogName" className="text-base font-normal text-foreground mb-3 block">
                愛犬のお名前 / Dog's Name *
              </Label>
              <Input
                id="dogName"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="例: ハチ, さくら, Max"
                className="sketch-border border-primary/20 text-base py-3 bg-background focus:border-primary/40 focus:ring-0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="ownerName" className="text-base font-normal text-foreground mb-3 block">
                飼い主さまのお名前 / Your Name
              </Label>
              <Input
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="お名前（任意）"
                className="sketch-border border-primary/20 text-base py-3 bg-background focus:border-primary/40 focus:ring-0"
              />
              <p className="text-sm text-muted-foreground mt-2 font-light">
                ケアガイドに記載されます / Will appear on the care guide
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-normal py-4 text-base sketch-border border-primary/30 organic-shape shadow-none"
              disabled={!dogName.trim()}
            >
              次へ進む / Continue
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DogInfoStep;
