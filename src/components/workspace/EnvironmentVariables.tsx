
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  const [newVar, setNewVar] = useState({ key: '', value: '', provider: 'azure' });

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
        description: "This environment variable already exists",
        variant: "destructive"
      });
      return;
    }

    const updated = [...envVars, { ...newVar }];
    saveEnvVars(updated);
    setNewVar({ key: '', value: '', provider: 'azure' });
    
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

  const handleKeyChange = (key: string) => {
    setNewVar({ ...newVar, key });
  };

  const handleValueChange = (value: string) => {
    setNewVar({ ...newVar, value });
  };

  const azureRequiredVars = [
    { key: 'AZURE_SUBSCRIPTION_ID', description: 'Azure Subscription ID' },
    { key: 'AZURE_SECRET_KEY', description: 'Azure authentication secret key' },
    { key: 'AZURE_ENDPOINT', description: 'Azure service endpoint URL (e.g., https://yourservice.openai.azure.com/)' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Environment Variables</h2>
        <p className="text-gray-600 mt-2">
          Configure your Azure credentials for deployment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Azure Configuration
          </CardTitle>
          <CardDescription>
            Set up your Azure credentials for Infrastructure as Code deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Required Variables:</label>
            <div className="grid gap-2">
              {azureRequiredVars.map((template) => (
                <div key={template.key} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <code className="text-sm bg-gray-100 px-1 rounded">{template.key}</code>
                    <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <EnvironmentVariableForm
            newVar={newVar}
            provider="azure"
            onKeyChange={handleKeyChange}
            onValueChange={handleValueChange}
            onSubmit={addEnvVar}
          />

          <EnvironmentVariablesList
            envVars={envVars}
            provider="azure"
            showValues={showValues}
            onToggleShow={toggleShowValue}
            onDelete={deleteEnvVar}
          />
        </CardContent>
      </Card>
    </div>
  );
}
