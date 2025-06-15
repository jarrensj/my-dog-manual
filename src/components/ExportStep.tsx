
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
      <Card className="border-2 border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Great! {dogName}'s Care Guide is Ready
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600 mb-6">
            You've created a care guide with {commandCount} commands for {dogName}. 
            Now you can export it to share with babysitters or caretakers.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button
              onClick={onExportText}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 border-2 hover:bg-gray-50"
            >
              <FileText className="w-8 h-8 text-gray-600" />
              <span className="font-medium">Export as Text</span>
              <span className="text-xs text-gray-500">Simple text file</span>
            </Button>
            
            <Button
              onClick={onExportPDF}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 border-2 hover:bg-gray-50"
            >
              <Download className="w-8 h-8 text-gray-600" />
              <span className="font-medium">Export as PDF</span>
              <span className="text-xs text-gray-500">Formatted document</span>
            </Button>
          </div>

          <Button 
            onClick={onContinueToManage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            Continue to Manage Commands
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportStep;
