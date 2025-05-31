
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { DeploymentCredentials } from '@/services/deploymentService';

interface AzureCredentialsFormProps {
  credentials: DeploymentCredentials;
  isValidating: boolean;
  onSubmit: (credentials: DeploymentCredentials) => void;
}

export function AzureCredentialsForm({ credentials, isValidating, onSubmit }: AzureCredentialsFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const subscriptionId = formData.get('subscriptionId') as string;
    const secretKey = formData.get('secretKey') as string;
    
    if (!subscriptionId || !secretKey) {
      return;
    }
    
    const newCredentials = {
      ...credentials,
      azure: {
        subscriptionId,
        secretKey,
        useDefaultCredential: true
      }
    };
    
    onSubmit(newCredentials);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-blue-800 mb-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">Azure Best Practices Enabled</span>
        </div>
        <p className="text-xs text-blue-700">
          Using Azure's recommended token-based authentication with DefaultAzureCredential.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subscriptionId">Azure Subscription ID *</Label>
          <Input
            id="subscriptionId"
            name="subscriptionId"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            required
          />
          <p className="text-xs text-gray-500">
            Your Azure subscription identifier
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secretKey">Secret Key *</Label>
          <Input
            id="secretKey"
            name="secretKey"
            type="password"
            placeholder="Enter your Azure secret key"
            required
          />
          <p className="text-xs text-gray-500">
            Your Azure authentication secret key
          </p>
        </div>
        
        <Button type="submit" disabled={isValidating} className="w-full">
          {isValidating ? 'Validating...' : 'Set Azure Credentials'}
        </Button>
      </form>
    </div>
  );
}
