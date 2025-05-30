
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DeploymentProgressOverviewProps {
  progress: number;
}

export function DeploymentProgressOverview({ progress }: DeploymentProgressOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
        
        <div className="text-sm text-gray-600">
          Estimated time remaining: {progress < 100 ? `${Math.ceil((100 - progress) * 0.3)} minutes` : 'Complete'}
        </div>
      </CardContent>
    </Card>
  );
}
