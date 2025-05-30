
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProviderTemplates } from './ProviderTemplates';
import { EnvironmentVariableForm } from './EnvironmentVariableForm';
import { EnvironmentVariablesList } from './EnvironmentVariablesList';

interface EnvVariable {
  key: string;
  value: string;
  provider: string;
}

export function EnvironmentVariables() {
  const { toast } = useToast();
  const [envVars, setEnvVars] = useState<EnvVariable[]>([]);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [newVar, setNewVar] = useState({ key: '', value: '', provider: 'aws' });

  // Load environment variables from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('instant8-env-vars');
    if (saved) {
      try {
        setEnvVars(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load environment variables:', error);
      }
    }
  }, []);

  // Save environment variables to localStorage
  const saveEnvVars = (vars: EnvVariable[]) => {
    localStorage.setItem('instant8-env-vars', JSON.stringify(vars));
    setEnvVars(vars);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('credentialsUpdated'));
  };

  const addEnvVar = () => {
    if (!newVar.key || !newVar.value) {
      toast({
        title: "Error",
        description: "Please fill in both key and value",
        variant: "destructive"
      });
      return;
    }

    const exists = envVars.some(v => v.key === newVar.key && v.provider === newVar.provider);
    if (exists) {
      toast({
        title: "Error", 
        description: "This environment variable already exists for this provider",
        variant: "destructive"
      });
      return;
    }

    const updated = [...envVars, { ...newVar }];
    saveEnvVars(updated);
    setNewVar({ key: '', value: '', provider: 'aws' });
    
    toast({
      title: "Success",
      description: "Environment variable added successfully"
    });
  };

  const deleteEnvVar = (index: number) => {
    const updated = envVars.filter((_, i) => i !== index);
    saveEnvVars(updated);
    
    toast({
      title: "Success",
      description: "Environment variable deleted"
    });
  };

  const toggleShowValue = (key: string) => {
    setShowValues(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTemplateSelect = (key: string, provider: string) => {
    setNewVar({ ...newVar, key, provider });
  };

  const handleKeyChange = (key: string) => {
    setNewVar({ ...newVar, key });
  };

  const handleValueChange = (value: string) => {
    setNewVar({ ...newVar, value });
  };

  const providerTemplates = {
    aws: [
      { key: 'AWS_ACCESS_KEY_ID', description: 'Your AWS Access Key ID' },
      { key: 'AWS_SECRET_ACCESS_KEY', description: 'Your AWS Secret Access Key' },
      { key: 'AWS_REGION', description: 'Default AWS region (e.g., us-east-1)' }
    ],
    azure: [
      { key: 'AZURE_CLIENT_ID', description: 'Azure Application (client) ID' },
      { key: 'AZURE_CLIENT_SECRET', description: 'Azure Client Secret' },
      { key: 'AZURE_TENANT_ID', description: 'Azure Directory (tenant) ID' },
      { key: 'AZURE_SUBSCRIPTION_ID', description: 'Azure Subscription ID' }
    ],
    gcp: [
      { key: 'GOOGLE_CREDENTIALS', description: 'Google Cloud service account JSON' },
      { key: 'GOOGLE_PROJECT', description: 'Google Cloud Project ID' },
      { key: 'GOOGLE_REGION', description: 'Default Google Cloud region' }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Environment Variables</h2>
        <p className="text-gray-600 mt-2">
          Configure your cloud provider credentials and other environment variables
        </p>
      </div>

      <Tabs defaultValue="aws" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="aws">AWS</TabsTrigger>
          <TabsTrigger value="azure">Azure</TabsTrigger>
          <TabsTrigger value="gcp">Google Cloud</TabsTrigger>
        </TabsList>

        {Object.entries(providerTemplates).map(([provider, templates]) => (
          <TabsContent key={provider} value={provider} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  {provider.toUpperCase()} Configuration
                </CardTitle>
                <CardDescription>
                  Set up your {provider.toUpperCase()} credentials for Infrastructure as Code deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProviderTemplates 
                  provider={provider}
                  templates={templates}
                  onTemplateSelect={handleTemplateSelect}
                />

                <EnvironmentVariableForm
                  newVar={newVar}
                  provider={provider}
                  onKeyChange={handleKeyChange}
                  onValueChange={handleValueChange}
                  onSubmit={addEnvVar}
                />

                <EnvironmentVariablesList
                  envVars={envVars}
                  provider={provider}
                  showValues={showValues}
                  onToggleShow={toggleShowValue}
                  onDelete={deleteEnvVar}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
