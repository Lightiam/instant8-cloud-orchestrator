import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Key, CheckCircle, AlertCircle, Shield, Info } from 'lucide-react';
import { deploymentService, DeploymentCredentials } from '@/services/deploymentService';
import { toast } from 'sonner';

interface CredentialsSetupProps {
  onCredentialsSet: (isValid: boolean) => void;
}

export function CredentialsSetup({ onCredentialsSet }: CredentialsSetupProps) {
  const [credentials, setCredentials] = useState<DeploymentCredentials>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [useDefaultCredential, setUseDefaultCredential] = useState(true);

  const handlePulumiSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accessToken = formData.get('pulumiToken') as string;
    
    if (!accessToken) {
      toast.error('Please enter your Pulumi access token');
      return;
    }

    const newCredentials = {
      ...credentials,
      pulumi: { accessToken }
    };
    
    await validateAndSetCredentials(newCredentials);
  };

  const handleAzureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const subscriptionId = formData.get('subscriptionId') as string;
    const tenantId = formData.get('tenantId') as string;
    
    if (!subscriptionId || !tenantId) {
      toast.error('Subscription ID and Tenant ID are required');
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
    
    await validateAndSetCredentials(newCredentials);
  };

  const handleAWSSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
    await validateAndSetCredentials(newCredentials);
  };

  const validateAndSetCredentials = async (newCredentials: DeploymentCredentials) => {
    setIsValidating(true);
    setCredentials(newCredentials);
    deploymentService.setCredentials(newCredentials);
    
    try {
      const valid = await deploymentService.validateCredentials();
      setIsValid(valid);
      onCredentialsSet(valid);
      
      if (valid) {
        toast.success('Credentials validated successfully using Azure best practices!');
      } else {
        toast.error('Invalid credentials. Please check and try again.');
      }
    } catch (error) {
      toast.error('Failed to validate credentials');
      setIsValid(false);
      onCredentialsSet(false);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Deployment Credentials
          {isValid && <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Configured
          </Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pulumi" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pulumi">Pulumi</TabsTrigger>
            <TabsTrigger value="azure">Azure</TabsTrigger>
            <TabsTrigger value="aws">AWS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pulumi" className="space-y-4">
            <form onSubmit={handlePulumiSubmit} className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="azure" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Azure Best Practices Enabled</span>
              </div>
              <p className="text-xs text-blue-700">
                Using Azure's recommended token-based authentication and DefaultAzureCredential for enhanced security.
              </p>
            </div>
            
            <form onSubmit={handleAzureSubmit} className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="aws" className="space-y-4">
            <form onSubmit={handleAWSSubmit} className="space-y-4">
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
          </TabsContent>
        </Tabs>
        
        {!isValid && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Credentials Required</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Please configure your cloud provider credentials to enable real deployments using Azure best practices.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
