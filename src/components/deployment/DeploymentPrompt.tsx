
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, Sparkles, Clock } from 'lucide-react';

interface DeploymentPromptProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onDeploy: () => void;
  isAnalyzing: boolean;
}

export function DeploymentPrompt({ prompt, onPromptChange, onDeploy, isAnalyzing }: DeploymentPromptProps) {
  return (
    <Card className="p-6 shadow-lg border-0 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-primary">Smart Deployment Prompt</h3>
      </div>
      
      <Textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Describe your infrastructure needs in plain English..."
        className="min-h-32 text-lg border-gray-200 focus:border-secondary resize-none"
      />
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">AI-Powered</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Multi-Cloud</Badge>
        </div>
        <Button 
          onClick={onDeploy}
          disabled={isAnalyzing}
          className="bg-gradient-secondary text-white px-8"
        >
          {isAnalyzing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Deploy Now
              <Play className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
