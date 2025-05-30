
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface CloudProviderSelectionProps {
  onDeploy: (provider: string) => void;
}

export function CloudProviderSelection({ onDeploy }: CloudProviderSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy to Cloud Provider</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 border-2 border-green-500 bg-green-50 hover:bg-green-100"
            onClick={() => onDeploy('aws')}
          >
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <span className="font-medium">Deploy to AWS</span>
            <span className="text-xs text-green-600">✨ Recommended</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:border-blue-500 hover:bg-blue-50"
            onClick={() => onDeploy('azure')}
          >
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span className="font-medium">Deploy to Azure</span>
            <span className="text-xs text-gray-500">Production ready</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:border-red-500 hover:bg-red-50"
            onClick={() => onDeploy('gcp')}
          >
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="font-medium">Deploy to GCP</span>
            <span className="text-xs text-gray-500">Global scale</span>
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900">Ready for Real Deployment</div>
              <div className="text-sm text-blue-700 mt-1">
                Your credentials are configured. Clicking deploy will provision actual infrastructure using Pulumi/Terraform. 
                You'll receive real URLs and access to your deployed services.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
