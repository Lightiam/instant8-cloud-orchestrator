
import { DefaultAzureCredential, ClientSecretCredential } from '@azure/identity';

export interface AuthCredentials {
  azure?: {
    subscriptionId: string;
    secretKey?: string;
    endpoint?: string;
    tenantId?: string;
    useDefaultCredential?: boolean;
    clientId?: string;
    clientSecret?: string;
  };
}

class AuthenticationService {
  private credentials: AuthCredentials = {};

  setCredentials(credentials: AuthCredentials) {
    this.credentials = credentials;
    console.log('✅ Authentication credentials set for Azure:', {
      hasAzure: !!credentials.azure,
      hasSubscriptionId: !!credentials.azure?.subscriptionId,
      hasSecretKey: !!credentials.azure?.secretKey,
      hasEndpoint: !!credentials.azure?.endpoint
    });
  }

  getCredentials(): AuthCredentials {
    console.log('🔍 Getting credentials - checking existing:', {
      hasExistingCredentials: !!this.credentials.azure,
      credentialsKeys: this.credentials.azure ? Object.keys(this.credentials.azure) : []
    });
    
    // If credentials are already set, use them
    if (this.credentials.azure) {
      console.log('✅ Using already configured credentials');
      return this.credentials;
    }
    
    // Only load from environment if no credentials are set
    console.log('⚠️ No credentials set, attempting to load from environment...');
    this.loadCredentialsFromEnvironment();
    return this.credentials;
  }

  private loadCredentialsFromEnvironment() {
    try {
      const saved = localStorage.getItem('instant8-env-vars');
      if (saved) {
        const envVars = JSON.parse(saved);
        console.log('Loading from environment variables:', envVars.length);
        
        const azureVars = envVars.filter((v: any) => v.provider === 'azure');
        
        if (azureVars.length > 0) {
          const subscriptionId = azureVars.find((v: any) => v.key === 'AZURE_SUBSCRIPTION_ID')?.value;
          const secretKey = azureVars.find((v: any) => v.key === 'AZURE_SECRET_KEY')?.value;
          const endpoint = azureVars.find((v: any) => v.key === 'AZURE_ENDPOINT')?.value;
          
          if (subscriptionId && secretKey && endpoint) {
            this.credentials = {
              azure: {
                subscriptionId,
                secretKey,
                endpoint,
                useDefaultCredential: true
              }
            };
            console.log('✅ Successfully loaded Azure credentials from environment variables');
          }
        }
      }
    } catch (error) {
      console.error('Failed to load credentials from environment:', error);
    }
  }

  createAzureCredential() {
    const azureCredentials = this.getCredentials().azure;
    if (!azureCredentials) {
      throw new Error('Azure credentials not configured');
    }

    const credential = new DefaultAzureCredential();
    console.log('✅ Using DefaultAzureCredential for Azure authentication');
    return credential;
  }

  async validateCredentials(): Promise<boolean> {
    console.log('🔐 Starting credential validation...');
    
    try {
      const credentials = this.getCredentials();
      console.log('📋 Retrieved credentials for validation:', {
        hasAzure: !!credentials.azure,
        azureCredentials: credentials.azure ? {
          hasSubscriptionId: !!credentials.azure.subscriptionId,
          hasSecretKey: !!credentials.azure.secretKey,
          hasEndpoint: !!credentials.azure.endpoint,
          subscriptionIdLength: credentials.azure.subscriptionId?.length || 0,
          secretKeyLength: credentials.azure.secretKey?.length || 0,
          endpointValue: credentials.azure.endpoint
        } : null
      });
      
      if (credentials.azure) {
        const { subscriptionId, secretKey, endpoint } = credentials.azure;
        console.log('📋 Validating Azure credentials...');
        
        if (!subscriptionId || !secretKey || !endpoint) {
          console.error('❌ Azure subscription ID, secret key, and endpoint are required');
          console.error('❌ Validation failed - missing required fields:', {
            missingSubscriptionId: !subscriptionId,
            missingSecretKey: !secretKey,
            missingEndpoint: !endpoint
          });
          return false;
        }

        console.log('✅ Azure credentials validated successfully');
        return true;
      }
      
      console.error('❌ No Azure credentials found during validation');
      return false;
    } catch (error) {
      console.error('❌ Credential validation failed:', error);
      return false;
    }
  }
}

export const authenticationService = new AuthenticationService();
