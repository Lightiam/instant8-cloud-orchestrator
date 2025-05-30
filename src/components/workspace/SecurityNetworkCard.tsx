
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export function SecurityNetworkCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security & Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">SSL/TLS:</span>
            <span className="font-medium text-green-600">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Firewall:</span>
            <span className="font-medium text-green-600">Configured</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">VPC:</span>
            <span className="font-medium text-green-600">Private Network</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Access Control:</span>
            <span className="font-medium">SSH Key + IAM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
