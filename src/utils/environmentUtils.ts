
interface EnvVariable {
  key: string;
  value: string;
  provider: string;
}

export const getStoredEnvVars = (): EnvVariable[] => {
  try {
    const saved = localStorage.getItem('instant8-env-vars');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load environment variables:', error);
    return [];
  }
};

export const hasValidCredentials = (provider?: string): boolean => {
  const envVars = getStoredEnvVars();
  
  if (provider) {
    // Check if specific provider has required credentials
    const providerVars = envVars.filter(v => v.provider === provider);
    
    switch (provider) {
      case 'aws':
        return providerVars.some(v => v.key === 'AWS_ACCESS_KEY_ID') &&
               providerVars.some(v => v.key === 'AWS_SECRET_ACCESS_KEY');
      case 'azure':
        return providerVars.some(v => v.key === 'AZURE_CLIENT_ID') &&
               providerVars.some(v => v.key === 'AZURE_CLIENT_SECRET') &&
               providerVars.some(v => v.key === 'AZURE_TENANT_ID');
      case 'gcp':
        return providerVars.some(v => v.key === 'GOOGLE_CREDENTIALS') &&
               providerVars.some(v => v.key === 'GOOGLE_PROJECT');
      default:
        return false;
    }
  }
  
  // Check if any provider has valid credentials
  return hasValidCredentials('aws') || 
         hasValidCredentials('azure') || 
         hasValidCredentials('gcp');
};

export const getProviderCredentials = (provider: string): Record<string, string> => {
  const envVars = getStoredEnvVars();
  const providerVars = envVars.filter(v => v.provider === provider);
  
  return providerVars.reduce((acc, envVar) => {
    acc[envVar.key] = envVar.value;
    return acc;
  }, {} as Record<string, string>);
};
