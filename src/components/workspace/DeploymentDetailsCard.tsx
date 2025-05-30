
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database } from 'lucide-react';
import { DeploymentConfig } from '@/services/deploymentService';

interface DeploymentDetailsCardProps {
  config: DeploymentConfig;
}

export function DeploymentDetailsCard({ config }: DeploymentDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Deployment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Deployment Type:</span>
            <span className="font-medium capitalize">{config.type?.replace('-', ' ') || 'Web Application'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Region:</span>
            <span className="font-medium">{config.region || 'US-East-1'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Auto-Scaling:</span>
            <span className="font-medium text-green-600">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Backup:</span>
            <span className="font-medium text-green-600">Daily</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monitoring:</span>
            <span className="font-medium text-green-600">Full Stack</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-sm text-gray-600 mb-2">Performance Tier:</div>
          <Badge className="bg-green-100 text-green-800">Production Ready</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
