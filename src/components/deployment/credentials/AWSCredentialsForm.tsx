
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeploymentCredentials } from '@/services/deploymentService';

interface AWSCredentialsFormProps {
  credentials: DeploymentCredentials;
  isValidating: boolean;
  onSubmit: (credentials: DeploymentCredentials) => void;
}

export function AWSCredentialsForm({ credentials, isValidating, onSubmit }: AWSCredentialsFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newCredentials = {
      ...credentials,
      aws: {
        accessKeyId: formData.get('accessKeyId') as string,
        secretAccessKey: formData.get('secretAccessKey') as string,
        region: formData.get('region') as string,
      }
    };
    
    onSubmit(newCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accessKeyId">Access Key ID</Label>
          <Input
            id="accessKeyId"
            name="accessKeyId"
            placeholder="AKIAIOSFODNN7EXAMPLE"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="secretAccessKey">Secret Access Key</Label>
          <Input
            id="secretAccessKey"
            name="secretAccessKey"
            type="password"
            placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Default Region</Label>
          <Input
            id="region"
            name="region"
            placeholder="us-east-1"
            defaultValue="us-east-1"
          />
        </div>
      </div>
      <Button type="submit" disabled={isValidating} className="w-full">
        {isValidating ? 'Validating...' : 'Set AWS Credentials'}
      </Button>
    </form>
  );
}
