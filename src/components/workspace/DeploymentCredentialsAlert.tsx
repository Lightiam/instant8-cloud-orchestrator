
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';

export function DeploymentCredentialsAlert() {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Key className="h-5 w-5" />
          Credentials Required
        </CardTitle>
        <CardDescription className="text-orange-700">
          Set up your cloud provider credentials to enable Infrastructure as Code generation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => window.location.href = '/workspace/environment'}
          className="bg-orange-600 hover:bg-orange-700"
        >
          Configure Environment Variables
        </Button>
      </CardContent>
    </Card>
  );
}
