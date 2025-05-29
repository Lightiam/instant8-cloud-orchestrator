
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Database } from 'lucide-react';

interface QuickTemplatesProps {
  onQuickDeploy: (provider: string) => void;
}

export function QuickTemplates({ onQuickDeploy }: QuickTemplatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Templates</CardTitle>
        <CardDescription>Skip the chat with pre-configured setups</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start h-auto p-3 hover:border-orange-500 hover:bg-orange-50"
          onClick={() => onQuickDeploy('aws')}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <Cloud className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Web App - AWS</div>
              <div className="text-xs text-gray-500">$127/mo</div>
            </div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start h-auto p-3 hover:border-blue-500 hover:bg-blue-50"
          onClick={() => onQuickDeploy('azure')}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <Database className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">ML Pipeline - Azure</div>
              <div className="text-xs text-gray-500">$342/mo</div>
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
