
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

interface DogInfoFormProps {
  dogName: string;
  setDogName: (name: string) => void;
  ownerName: string;
  setOwnerName: (name: string) => void;
}

const DogInfoForm: React.FC<DogInfoFormProps> = ({
  dogName,
  setDogName,
  ownerName,
  setOwnerName
}) => {
  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Dog & Owner Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="dogName" className="text-sm font-medium text-gray-700">
            Dog's Name
          </Label>
          <Input
            id="dogName"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="e.g., Max, Bella, Charlie"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
            Your Name (Optional)
          </Label>
          <Input
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Your name"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DogInfoForm;
