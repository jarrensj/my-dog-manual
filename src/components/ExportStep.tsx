
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, ArrowRight, CheckCircle } from 'lucide-react';

interface ExportStepProps {
  dogName: string;
  commandCount: number;
  onExportText: () => void;
  onExportPDF: () => void;
  onContinueToManage: () => void;
}

const ExportStep: React.FC<ExportStepProps> = ({
  dogName,
  commandCount,
  onExportText,
  onExportPDF,
  onContinueToManage
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="terminal-border border-primary bg-card">
        <div className="terminal-header">
          <span className="text-primary font-bold">compilation_complete.log</span>
        </div>
        <CardContent className="terminal-spacing text-center">
          <div className="text-primary font-mono mb-6">
            <CheckCircle className="w-8 h-8 mx-auto mb-4" />
            &gt; Manual compilation successful!
            <br />
            &gt; Generated {commandCount} commands for {dogName}
            <span className="cursor"></span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button
              onClick={onExportText}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 terminal-border border-muted hover:border-primary text-foreground font-mono bg-input"
            >
              <FileText className="w-6 h-6" />
              <span className="font-bold">EXPORT .TXT</span>
            </Button>
            
            <Button
              onClick={onExportPDF}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 terminal-border border-muted hover:border-primary text-foreground font-mono bg-input"
            >
              <Download className="w-6 h-6" />
              <span className="font-bold">EXPORT .PDF</span>
            </Button>
          </div>

          <Button 
            onClick={onContinueToManage}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold py-4 terminal-border border-primary"
          >
            ENTER MANAGEMENT MODE
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportStep;
