
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, ArrowRight, CheckCircle, Heart } from 'lucide-react';

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
      <Card className="sketch-border border-primary/30 shadow-none organic-shape relative textured">
        <CardHeader className="bg-primary/5 text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-primary font-light text-xl">
            <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
            完了！{dogName}ちゃんのケアガイドができました
          </CardTitle>
          <p className="text-sm text-muted-foreground font-light mt-2">
            Great! {dogName}'s Care Guide is Ready
          </p>
        </CardHeader>
        <CardContent className="zen-spacing text-center">
          <p className="text-muted-foreground mb-8 leading-relaxed font-light">
            {dogName}ちゃんのために{commandCount}個のコマンドでケアガイドを作成しました。
            <br />
            ペットシッターさんや介護者さんと共有するためにエクスポートできます。
            <br />
            <span className="text-sm opacity-75 mt-2 block">
              You've created a care guide with {commandCount} commands for {dogName}.
              Now you can export it to share with babysitters or caretakers.
            </span>
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Button
              onClick={onExportText}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-3 sketch-border border-primary/30 hover:bg-primary/10 text-primary font-normal shadow-none organic-shape"
            >
              <FileText className="w-8 h-8" strokeWidth={1.5} />
              <div>
                <span className="font-normal block">テキストでエクスポート</span>
                <span className="text-xs opacity-75">Export as Text</span>
              </div>
            </Button>
            
            <Button
              onClick={onExportPDF}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-3 sketch-border border-primary/30 hover:bg-primary/10 text-primary font-normal shadow-none organic-shape"
            >
              <Download className="w-8 h-8" strokeWidth={1.5} />
              <div>
                <span className="font-normal block">PDFでエクスポート</span>
                <span className="text-xs opacity-75">Export as PDF</span>
              </div>
            </Button>
          </div>

          <Button 
            onClick={onContinueToManage}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-normal py-4 text-base sketch-border border-primary/30 organic-shape shadow-none"
          >
            コマンドの管理に進む / Continue to Manage Commands
            <ArrowRight className="w-5 h-5 ml-2" strokeWidth={1.5} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportStep;
