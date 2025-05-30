
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface DeploymentResultProps {
  deploymentUrl: string;
  progress: number;
}

export function DeploymentResult({ deploymentUrl, progress }: DeploymentResultProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard!');
  };

  if (progress !== 100 || !deploymentUrl) {
    return null;
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800">🎉 Deployment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="font-medium text-green-800 mb-2">Your RAG application is now live:</div>
          <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
            <code className="flex-1 text-sm">{deploymentUrl}</code>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => copyToClipboard(deploymentUrl)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              onClick={() => window.open(deploymentUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-green-800">API Endpoint:</div>
            <code className="text-gray-600">{deploymentUrl}/api/chat</code>
          </div>
          <div>
            <div className="font-medium text-green-800">Admin Panel:</div>
            <code className="text-gray-600">{deploymentUrl}/admin</code>
          </div>
        </div>

        <div className="pt-4 border-t border-green-200">
          <div className="font-medium text-green-800 mb-2">Next Steps:</div>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Upload your documents to the RAG system</li>
            <li>• Configure your knowledge base settings</li>
            <li>• Test the chat interface</li>
            <li>• Monitor performance in the dashboard</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
