
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
  console.log('Checking credentials for provider:', provider, 'Available vars:', envVars);
  
  if (provider) {
    // Check if specific provider has required credentials
    const providerVars = envVars.filter(v => v.provider === provider);
    console.log(`Provider ${provider} vars:`, providerVars);
    
    switch (provider) {
      case 'aws':
        const hasAwsKey = providerVars.some(v => v.key === 'AWS_ACCESS_KEY_ID' && v.value.trim() !== '');
        const hasAwsSecret = providerVars.some(v => v.key === 'AWS_SECRET_ACCESS_KEY' && v.value.trim() !== '');
        console.log('AWS credentials check:', { hasAwsKey, hasAwsSecret });
        return hasAwsKey && hasAwsSecret;
      case 'azure':
        const hasAzureClient = providerVars.some(v => v.key === 'AZURE_CLIENT_ID' && v.value.trim() !== '');
        const hasAzureSecret = providerVars.some(v => v.key === 'AZURE_CLIENT_SECRET' && v.value.trim() !== '');
        const hasAzureTenant = providerVars.some(v => v.key === 'AZURE_TENANT_ID' && v.value.trim() !== '');
        console.log('Azure credentials check:', { hasAzureClient, hasAzureSecret, hasAzureTenant });
        return hasAzureClient && hasAzureSecret && hasAzureTenant;
      case 'gcp':
        const hasGoogleCreds = providerVars.some(v => v.key === 'GOOGLE_CREDENTIALS' && v.value.trim() !== '');
        const hasGoogleProject = providerVars.some(v => v.key === 'GOOGLE_PROJECT' && v.value.trim() !== '');
        console.log('GCP credentials check:', { hasGoogleCreds, hasGoogleProject });
        return hasGoogleCreds && hasGoogleProject;
      default:
        return false;
    }
  }
  
  // Check if any provider has valid credentials
  const hasAnyCredentials = hasValidCredentials('aws') || 
                           hasValidCredentials('azure') || 
                           hasValidCredentials('gcp');
  console.log('Any valid credentials:', hasAnyCredentials);
  return hasAnyCredentials;
};

export const getProviderCredentials = (provider: string): Record<string, string> => {
  const envVars = getStoredEnvVars();
  const providerVars = envVars.filter(v => v.provider === provider);
  
  return providerVars.reduce((acc, envVar) => {
    acc[envVar.key] = envVar.value;
    return acc;
  }, {} as Record<string, string>);
};
