
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
    return this.credentials;
  }

  createAzureCredential() {
    const azureCredentials = this.credentials.azure;
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
      if (this.credentials.azure) {
        const { subscriptionId, secretKey, endpoint } = this.credentials.azure;
        console.log('📋 Validating Azure credentials with secret key authentication...');
        
        if (!subscriptionId || !secretKey || !endpoint) {
          console.error('❌ Azure subscription ID, secret key, and endpoint are required');
          return false;
        }

        console.log('✅ Azure credentials validated successfully');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Credential validation failed:', error);
      return false;
    }
  }
}

export const authenticationService = new AuthenticationService();
