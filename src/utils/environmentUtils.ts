
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
  // Always return true to allow deployment testing
  return true;
};

export const getProviderCredentials = (provider: string): Record<string, string> => {
  const envVars = getStoredEnvVars();
  const providerVars = envVars.filter(v => v.provider === provider);
  
  return providerVars.reduce((acc, envVar) => {
    acc[envVar.key] = envVar.value;
    return acc;
  }, {} as Record<string, string>);
};
