
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useCredentials } from '@/hooks/useCredentials';
import { AzureCredentialsForm } from './credentials/AzureCredentialsForm';
import { AWSCredentialsForm } from './credentials/AWSCredentialsForm';

interface CredentialsSetupProps {
  onCredentialsSet: (isValid: boolean) => void;
}

export function CredentialsSetup({ onCredentialsSet }: CredentialsSetupProps) {
  const { credentials, isValidating, isValid, validateAndSetCredentials } = useCredentials(onCredentialsSet);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Cloud Provider Credentials
          {isValid && <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Configured
          </Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="azure" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="azure">Azure</TabsTrigger>
            <TabsTrigger value="aws">AWS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="azure" className="space-y-4">
            <AzureCredentialsForm
              credentials={credentials}
              isValidating={isValidating}
              onSubmit={validateAndSetCredentials}
            />
          </TabsContent>
          
          <TabsContent value="aws" className="space-y-4">
            <AWSCredentialsForm
              credentials={credentials}
              isValidating={isValidating}
              onSubmit={validateAndSetCredentials}
            />
          </TabsContent>
        </Tabs>
        
        {!isValid && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Cloud Provider Credentials Required</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Please configure your cloud provider credentials to enable deployments using industry best practices.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
