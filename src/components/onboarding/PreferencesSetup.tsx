
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Globe, Shield, DollarSign } from 'lucide-react';

const PreferencesSetup = () => {
  const [preferences, setPreferences] = useState({
    defaultRegion: 'us-east-1',
    preferredProvider: 'aws',
    securityLevel: 'standard',
    costOptimization: 'balanced'
  });

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' }
  ];

  const providers = [
    { value: 'aws', label: 'Amazon Web Services', icon: '🟧' },
    { value: 'azure', label: 'Microsoft Azure', icon: '🔵' },
    { value: 'gcp', label: 'Google Cloud Platform', icon: '🟡' },
    { value: 'multi', label: 'Multi-Cloud (Recommended)', icon: '☁️' }
  ];

  const securityLevels = [
    { value: 'basic', label: 'Basic', description: 'Standard security configurations' },
    { value: 'standard', label: 'Standard', description: 'Enhanced security with best practices' },
    { value: 'strict', label: 'Strict', description: 'Maximum security and compliance' }
  ];

  const costOptions = [
    { value: 'performance', label: 'Performance First', description: 'Optimize for speed and reliability' },
    { value: 'balanced', label: 'Balanced', description: 'Balance between cost and performance' },
    { value: 'cost', label: 'Cost Optimized', description: 'Minimize costs with spot instances' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Settings className="w-8 h-8 text-purple-600" />
        </div>
        <p className="text-gray-600">
          Set your default preferences for faster deployments. You can always customize these settings for individual deployments.
        </p>
      </div>

      {/* Default Region */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Globe className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Default Region</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Choose your preferred deployment region for faster access and compliance.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {regions.map((region) => (
            <button
              key={region.value}
              onClick={() => setPreferences({...preferences, defaultRegion: region.value})}
              className={`p-3 text-left border rounded-lg transition-colors ${
                preferences.defaultRegion === region.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{region.label}</div>
              <div className="text-sm text-gray-500">{region.value}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Preferred Provider */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-xl mr-2">☁️</span>
          <h3 className="font-semibold text-gray-900">Preferred Cloud Provider</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Select your default cloud provider for new deployments.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {providers.map((provider) => (
            <button
              key={provider.value}
              onClick={() => setPreferences({...preferences, preferredProvider: provider.value})}
              className={`p-3 text-left border rounded-lg transition-colors ${
                preferences.preferredProvider === provider.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-2">{provider.icon}</span>
                <span className="font-medium">{provider.label}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Security Level */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Security Level</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Choose your default security configuration for deployments.
        </p>
        <div className="space-y-3">
          {securityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setPreferences({...preferences, securityLevel: level.value})}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                preferences.securityLevel === level.value
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{level.label}</div>
              <div className="text-sm text-gray-500">{level.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Cost Optimization */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Cost Optimization</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Set your cost optimization preference for deployments.
        </p>
        <div className="space-y-3">
          {costOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setPreferences({...preferences, costOptimization: option.value})}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                preferences.costOptimization === option.value
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PreferencesSetup;
