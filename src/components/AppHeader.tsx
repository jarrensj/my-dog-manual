
import React from 'react';
import { Users, Heart } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Users className="w-8 h-8 text-orange-500" />
        <h1 className="text-4xl font-bold text-gray-800">Dog Care Guide Builder</h1>
        <Heart className="w-8 h-8 text-orange-500" />
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Create a comprehensive care guide for babysitters, pet sitters, and caretakers. Help them understand how to communicate with your dog and provide the best care while you're away.
      </p>
    </div>
  );
};

export default AppHeader;
