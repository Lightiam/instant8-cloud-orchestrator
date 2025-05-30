
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
      case 'azure': return 'Azure';
      case 'gcp': return 'Google Cloud';
      default: return provider.toUpperCase();
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
            Successfully Deployed to {getProviderName(selectedProvider)}
          </CardTitle>
          <CardDescription>Your application is now running and ready to use</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onNewDeployment}>
            Deploy Another Instance
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">+1 from deployment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Running</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
