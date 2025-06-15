
import React from 'react';
import { Terminal, Code } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <div className="terminal-spacing text-center">
      <div className="terminal-border border-primary bg-card mb-8">
        <div className="terminal-header">
          <span className="text-primary font-bold">mydogmanual.com</span>
        </div>
        <div className="p-6">
          <div className="ascii-art text-primary mb-4">
{`    /\_/\      /\_/\
   ( o.o )    ( ^.^ )
    > ^ <      > ^ <
   /     \    /     \
  (  ===  )  (  ===  )`}
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Terminal className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-mono">
              DOG CARE COMMAND CENTER
            </h1>
            <Code className="w-6 h-6 text-primary" />
          </div>
          <div className="command-prompt text-foreground font-mono">
            Initialize care protocol for your canine companion
          </div>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            &gt; Creating comprehensive dog care manual...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
