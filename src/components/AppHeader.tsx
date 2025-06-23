import React from 'react';
import { Terminal, Code } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const AppHeader: React.FC = () => {
  return (
    <div className="terminal-spacing text-center">
      <div className="terminal-border border-primary bg-card mb-8">
        <div className="terminal-header">
          <span className="text-primary font-bold">mydogmanual.com</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <div className="p-6">
          <div className="ascii-art text-primary mb-4">
{`      /^-^\     /^-----^\\
     /  o o \\   /  o   o  \\
    (    ^    ) (    __    )
     \\  ---  /   \\  \\__/  /
      ~~~~~~       ~~~~~~`}
          </div>
          <div className="flex items-center justify-center gap-4 mb-3">
            <Terminal className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-mono">
              MY DOG MANUAL GENERATOR
            </h1>
            <Code className="w-6 h-6 text-primary" />
          </div>
          <div className="command-prompt text-foreground font-mono mb-2">
            Create personalized care guides for your furry friend
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            &gt; Generating custom dog care manual...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
