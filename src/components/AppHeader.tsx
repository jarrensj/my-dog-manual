

import React from 'react';
import { Terminal, Code, Github } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <div className="terminal-spacing text-center">
      <div className="terminal-border border-primary bg-card mb-8">
        <div className="terminal-header">
          <span className="text-primary font-bold">mydogmanual.com</span>
        </div>
        <div className="p-6">
          <div className="ascii-art text-primary mb-4">
{`      /^-^\     /^-----^\\
     /  o o \\   /  o   o  \\
    (    ^    ) (    __    )
     \\  ---  /   \\  \\__/  /
      ~~~~~~       ~~~~~~`}
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
          <div className="mt-4 pt-4 border-t border-border">
            <a 
              href="https://github.com/jarrensj/my-dog-manual" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

