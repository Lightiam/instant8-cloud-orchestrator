import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Key, Eye, EyeOff, Trash2, Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const getProviderVars = (provider: string) => {
    return envVars.filter(v => v.provider === provider);
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
                {/* Template suggestions */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Required Variables:</Label>
                  <div className="grid gap-2">
                    {templates.map((template) => (
                      <div key={template.key} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <code className="text-sm bg-gray-100 px-1 rounded">{template.key}</code>
                          <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setNewVar({ ...newVar, key: template.key, provider })}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add new variable form */}
                <div className="border-t pt-4 space-y-3">
                  <Label className="text-sm font-medium">Add New Variable:</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="key">Variable Name</Label>
                      <Input
                        id="key"
                        placeholder="e.g., AWS_ACCESS_KEY_ID"
                        value={newVar.provider === provider ? newVar.key : ''}
                        onChange={(e) => setNewVar({ ...newVar, key: e.target.value, provider })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="password"
                        placeholder="Enter the value"
                        value={newVar.provider === provider ? newVar.value : ''}
                        onChange={(e) => setNewVar({ ...newVar, value: e.target.value, provider })}
                      />
                    </div>
                    <Button onClick={addEnvVar} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Variable
                    </Button>
                  </div>
                </div>

                {/* Existing variables */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Configured Variables:</Label>
                  {getProviderVars(provider).length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No variables configured yet</p>
                  ) : (
                    <div className="space-y-2">
                      {getProviderVars(provider).map((envVar, index) => (
                        <div key={`${envVar.key}-${index}`} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <code className="text-sm bg-gray-100 px-1 rounded">{envVar.key}</code>
                              <Badge variant="outline" className="text-xs">
                                {provider.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs text-gray-600">
                                {showValues[`${envVar.key}-${index}`] 
                                  ? envVar.value 
                                  : '•'.repeat(Math.min(envVar.value.length, 20))
                                }
                              </code>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleShowValue(`${envVar.key}-${index}`)}
                            >
                              {showValues[`${envVar.key}-${index}`] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteEnvVar(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
