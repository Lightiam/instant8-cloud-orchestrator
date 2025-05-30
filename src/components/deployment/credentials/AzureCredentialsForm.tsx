
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, Info } from 'lucide-react';
import { DeploymentCredentials } from '@/services/deploymentService';

interface AzureCredentialsFormProps {
  credentials: DeploymentCredentials;
  isValidating: boolean;
  onSubmit: (credentials: DeploymentCredentials) => void;
}

export function AzureCredentialsForm({ credentials, isValidating, onSubmit }: AzureCredentialsFormProps) {
  const [useDefaultCredential, setUseDefaultCredential] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const subscriptionId = formData.get('subscriptionId') as string;
    const tenantId = formData.get('tenantId') as string;
    
    if (!subscriptionId || !tenantId) {
      return;
    }
    
    const newCredentials = {
      ...credentials,
      azure: {
        subscriptionId,
        tenantId,
        useDefaultCredential,
        clientId: useDefaultCredential ? undefined : formData.get('clientId') as string,
        clientSecret: useDefaultCredential ? undefined : formData.get('clientSecret') as string,
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
          Using Azure's recommended token-based authentication and DefaultAzureCredential for enhanced security.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subscriptionId">Subscription ID *</Label>
            <Input
              id="subscriptionId"
              name="subscriptionId"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenantId">Tenant ID *</Label>
            <Input
              id="tenantId"
              name="tenantId"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              required
            />
          </div>
        </div>
        
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Use Default Azure Credential</Label>
              <p className="text-xs text-gray-500">
                Recommended: Uses Azure's token-based authentication (OIDC, Managed Identity)
              </p>
            </div>
            <Switch
              checked={useDefaultCredential}
              onCheckedChange={setUseDefaultCredential}
            />
          </div>
          
          {!useDefaultCredential && (
            <>
              <div className="flex items-center gap-2 text-amber-600 text-xs">
                <Info className="h-3 w-3" />
                <span>Fallback: Service Principal authentication (not recommended for production)</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID</Label>
                  <Input
                    id="clientId"
                    name="clientId"
                    placeholder="Service principal client ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientSecret">Client Secret</Label>
                  <Input
                    id="clientSecret"
                    name="clientSecret"
                    type="password"
                    placeholder="Service principal secret"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        <Button type="submit" disabled={isValidating} className="w-full">
          {isValidating ? 'Validating...' : 'Set Azure Credentials'}
        </Button>
      </form>
    </div>
  );
}
