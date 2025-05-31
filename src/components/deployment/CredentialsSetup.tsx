
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useCredentials } from '@/hooks/useCredentials';
import { AzureCredentialsForm } from './credentials/AzureCredentialsForm';

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
          Azure Credentials
          {isValid && <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Configured
          </Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AzureCredentialsForm
          credentials={credentials}
          isValidating={isValidating}
          onSubmit={validateAndSetCredentials}
        />
        
        {!isValid && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Azure Credentials Required</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Please configure your Azure credentials to enable deployments.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
