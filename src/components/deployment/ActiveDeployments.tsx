
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Play } from 'lucide-react';

export function ActiveDeployments() {
  return (
    <Card className="p-6 shadow-lg border-0 animate-slide-up animate-delay-400">
      <h3 className="text-lg font-semibold text-primary mb-4">Active Deployments</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">web-server-prod-001</span>
            <span className="text-sm text-gray-600">80%</span>
          </div>
          <Progress value={80} className="h-2 mb-2" />
          <div className="text-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AWS EC2 (us-east-1)</span>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Running</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Azure VM (eastus)</span>
              <div className="flex items-center text-yellow-600">
                <Clock className="w-3 h-3 mr-1" />
                <span className="text-xs">Starting</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">ml-training-dev-002</span>
            <span className="text-sm text-gray-600">40%</span>
          </div>
          <Progress value={40} className="h-2 mb-2" />
          <div className="text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AWS EC2 (us-west-2)</span>
              <div className="flex items-center text-blue-600">
                <Play className="w-3 h-3 mr-1" />
                <span className="text-xs">Launching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
