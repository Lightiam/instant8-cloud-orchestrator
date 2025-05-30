
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeploymentCredentials } from '@/services/deploymentService';

interface PulumiCredentialsFormProps {
  credentials: DeploymentCredentials;
  isValidating: boolean;
  onSubmit: (credentials: DeploymentCredentials) => void;
}

export function PulumiCredentialsForm({ credentials, isValidating, onSubmit }: PulumiCredentialsFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accessToken = formData.get('pulumiToken') as string;
    
    if (!accessToken) {
      return;
    }

    const newCredentials = {
      ...credentials,
      pulumi: { accessToken }
    };
    
    onSubmit(newCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pulumiToken">Pulumi Access Token</Label>
        <Input
          id="pulumiToken"
          name="pulumiToken"
          type="password"
          placeholder="pul-12c056b7af91a9892ba74be9cc3c0418b09f3929"
          defaultValue="pul-12c056b7af91a9892ba74be9cc3c0418b09f3929"
        />
        <p className="text-xs text-gray-500">
          Get your token from the Pulumi Console → Settings → Access Tokens
        </p>
      </div>
      <Button type="submit" disabled={isValidating} className="w-full">
        {isValidating ? 'Validating...' : 'Set Pulumi Credentials'}
      </Button>
    </form>
  );
}
