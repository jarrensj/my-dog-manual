
import React from 'react';
import { Users, Heart } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <div className="zen-spacing text-center relative textured">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="sketch-border p-2 text-primary">
          <Users className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-light text-foreground tracking-wide">
          犬のケアガイド
        </h1>
        <div className="sketch-border p-2 text-primary">
          <Heart className="w-6 h-6" strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
        大切な愛犬のための、シンプルで分かりやすいケアガイドを作成しましょう。
        <br />
        <span className="text-sm opacity-75">
          Create a simple, clear care guide for your beloved dog.
        </span>
      </p>
    </div>
  );
};

export default AppHeader;
