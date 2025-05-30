
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DeploymentStep {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration?: string;
  details?: string;
}

interface DeploymentStepsListProps {
  steps: DeploymentStep[];
}

export function DeploymentStepsList({ steps }: DeploymentStepsListProps) {
  const getStatusIcon = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              {getStatusIcon(step.status)}
              <div className="flex-1">
                <div className="font-medium">{step.title}</div>
                {step.status === 'running' && (
                  <div className="text-sm text-blue-600">In progress...</div>
                )}
                {step.status === 'completed' && (
                  <div className="text-sm text-green-600">✓ Completed</div>
                )}
              </div>
              {step.status === 'completed' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Done
                </Badge>
              )}
              {step.status === 'running' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Running
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
