
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Plus, Cloud, Settings } from 'lucide-react';

interface CompletedDeploymentProps {
  selectedProvider: string;
  onNewDeployment: () => void;
}

export function CompletedDeployment({ selectedProvider, onNewDeployment }: CompletedDeploymentProps) {
  const getProviderName = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws': return 'AWS';
      case 'azure': return 'Microsoft Azure';
      case 'gcp': return 'Google Cloud Platform';
      default: return provider;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws': return 'text-orange-600';
      case 'azure': return 'text-blue-600';
      case 'gcp': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Deployment Complete</h2>
        <Button onClick={onNewDeployment} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Successfully Deployed to <span className={getProviderColor(selectedProvider)}>{getProviderName(selectedProvider)}</span>
          </CardTitle>
          <CardDescription>Your infrastructure is now provisioned and running on {getProviderName(selectedProvider)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-green-700">
              <p>✅ Virtual Machine created</p>
              <p>✅ Network security configured</p>
              <p>✅ Application deployed</p>
              <p>✅ DNS configured</p>
            </div>
            <Button onClick={onNewDeployment} className="w-full">
              Deploy Another Instance
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provider</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getProviderColor(selectedProvider)}`}>
              {getProviderName(selectedProvider)}
            </div>
            <p className="text-xs text-muted-foreground">Infrastructure deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
