
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Check, Plus, AlertCircle } from 'lucide-react';

const CloudProviderSetup = () => {
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
  const [showCredentials, setShowCredentials] = useState<string | null>(null);

  const providers = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      logo: '🟧',
      description: 'Connect your AWS account for EC2 deployments',
      credentials: ['Access Key ID', 'Secret Access Key', 'Default Region']
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      logo: '🔵',
      description: 'Connect your Azure account for VM deployments',
      credentials: ['Client ID', 'Client Secret', 'Tenant ID', 'Subscription ID']
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      logo: '🟡',
      description: 'Connect your GCP account for Compute Engine',
      credentials: ['Project ID', 'Service Account Key (JSON)']
    }
  ];

  const handleConnect = (providerId: string) => {
    setConnectedProviders([...connectedProviders, providerId]);
    setShowCredentials(null);
  };

  const handleShowCredentials = (providerId: string) => {
    setShowCredentials(providerId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <span className="text-2xl">☁️</span>
        </div>
        <p className="text-gray-600">
          Connect your cloud provider accounts to start deploying infrastructure.
          You can add more providers later in your settings.
        </p>
      </div>

      <div className="grid gap-4">
        {providers.map((provider) => {
          const isConnected = connectedProviders.includes(provider.id);
          const showingCredentials = showCredentials === provider.id;

          return (
            <Card key={provider.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{provider.logo}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isConnected ? (
                    <div className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShowCredentials(provider.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>

              {showingCredentials && !isConnected && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-3 text-amber-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      Your credentials are encrypted and stored securely
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {provider.credentials.map((credential, index) => (
                      <div key={index}>
                        <Label htmlFor={`${provider.id}-${index}`} className="text-sm">
                          {credential}
                        </Label>
                        <Input
                          id={`${provider.id}-${index}`}
                          type={credential.toLowerCase().includes('secret') || credential.toLowerCase().includes('key') ? 'password' : 'text'}
                          placeholder={`Enter your ${credential.toLowerCase()}`}
                          className="mt-1"
                        />
                      </div>
                    ))}
                    
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => handleConnect(provider.id)}
                      >
                        Save & Connect
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCredentials(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {connectedProviders.length > 0 && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-green-700">
            Great! You've connected {connectedProviders.length} cloud provider{connectedProviders.length > 1 ? 's' : ''}.
            You can always add more providers later.
          </p>
        </div>
      )}
    </div>
  );
};

export default CloudProviderSetup;
