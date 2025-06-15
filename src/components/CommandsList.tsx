
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2, FileText, Users } from 'lucide-react';
import { DogCommand } from '@/types/dogCommand';

interface CommandsListProps {
  commands: DogCommand[];
  onRemoveCommand: (id: string) => void;
  onExportText: () => void;
  onExportPDF: () => void;
}

const CommandsList: React.FC<CommandsListProps> = ({
  commands,
  onRemoveCommand,
  onExportText,
  onExportPDF
}) => {
  return (
    <Card className="border-2 border-green-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardTitle className="flex items-center justify-between">
          <span>Care Instructions ({commands.length})</span>
          {commands.length > 0 && (
            <div className="flex gap-2">
              <Button
                onClick={onExportText}
                variant="secondary"
                size="sm"
                className="bg-white text-green-600 hover:bg-green-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export TXT
              </Button>
              <Button
                onClick={onExportPDF}
                variant="secondary"
                size="sm"
                className="bg-white text-green-600 hover:bg-green-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {commands.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No instructions added yet.</p>
            <p className="text-sm">Start building your dog's care guide!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {commands.map((command) => (
              <div key={command.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">"{command.command}"</h3>
                    <p className="text-gray-600 mb-2"><span className="font-medium">Meaning:</span> {command.description}</p>
                    {command.whenToUse && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">When to use:</span> {command.whenToUse}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => onRemoveCommand(command.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommandsList;
