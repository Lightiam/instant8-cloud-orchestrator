
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
    console.log('Authentication credentials configured for Azure');
  }

  getCredentials(): AuthCredentials {
    // Always try to load from environment variables first
    this.loadCredentialsFromEnvironment();
    return this.credentials;
  }

  private loadCredentialsFromEnvironment() {
    try {
      const saved = localStorage.getItem('instant8-env-vars');
      if (saved) {
        const envVars = JSON.parse(saved);
        console.log('Found environment variables:', envVars.length);
        
        const azureVars = envVars.filter((v: any) => v.provider === 'azure');
        console.log('Found Azure variables:', azureVars.length);
        
        if (azureVars.length > 0) {
          const subscriptionId = azureVars.find((v: any) => v.key === 'AZURE_SUBSCRIPTION_ID')?.value;
          const secretKey = azureVars.find((v: any) => v.key === 'AZURE_SECRET_KEY')?.value;
          const endpoint = azureVars.find((v: any) => v.key === 'AZURE_ENDPOINT')?.value;
          
          console.log('Loaded credentials:', {
            subscriptionId: subscriptionId ? 'present' : 'missing',
            secretKey: secretKey ? 'present' : 'missing',
            endpoint: endpoint ? 'present' : 'missing'
          });
          
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
          } else {
            console.warn('⚠️ Missing required Azure credentials:', {
              subscriptionId: !subscriptionId,
              secretKey: !secretKey,
              endpoint: !endpoint
            });
          }
        }
      } else {
        console.log('No environment variables found in localStorage');
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

    // Always use DefaultAzureCredential when only subscription ID is provided
    const credential = new DefaultAzureCredential();
    console.log('✅ Using DefaultAzureCredential for Azure authentication');
    return credential;
  }

  async validateCredentials(): Promise<boolean> {
    console.log('🔐 Validating Azure credentials...');
    
    try {
      // Force reload credentials from environment
      this.loadCredentialsFromEnvironment();
      
      const credentials = this.getCredentials();
      if (credentials.azure) {
        const { subscriptionId, secretKey, endpoint } = credentials.azure;
        console.log('📋 Validating Azure credentials with secret key authentication...');
        
        if (!subscriptionId || !secretKey || !endpoint) {
          console.error('❌ Azure subscription ID, secret key, and endpoint are required');
          console.error('Missing:', {
            subscriptionId: !subscriptionId,
            secretKey: !secretKey,
            endpoint: !endpoint
          });
          return false;
        }

        console.log('✅ Azure credentials validated successfully');
        return true;
      }
      
      console.error('❌ No Azure credentials found');
      return false;
    } catch (error) {
      console.error('❌ Credential validation failed:', error);
      return false;
    }
  }
}

export const authenticationService = new AuthenticationService();
