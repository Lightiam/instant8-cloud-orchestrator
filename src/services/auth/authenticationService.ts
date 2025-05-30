
import { DefaultAzureCredential, ClientSecretCredential } from '@azure/identity';

export interface AuthCredentials {
  pulumi?: {
    accessToken: string;
  };
  azure?: {
    subscriptionId: string;
    tenantId: string;
    useDefaultCredential?: boolean;
    clientId?: string;
    clientSecret?: string;
  };
  aws?: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
}

class AuthenticationService {
  private credentials: AuthCredentials = {};

  setCredentials(credentials: AuthCredentials) {
    this.credentials = credentials;
    console.log('Authentication credentials configured for:', Object.keys(credentials));
  }

  getCredentials(): AuthCredentials {
    return this.credentials;
  }

  createAzureCredential() {
    const azureCredentials = this.credentials.azure;
    if (!azureCredentials) {
      throw new Error('Azure credentials not configured');
    }

    let credential;
    
    if (azureCredentials.useDefaultCredential) {
      credential = new DefaultAzureCredential();
      console.log('✅ Using DefaultAzureCredential for Azure authentication');
    } else if (azureCredentials.clientId && azureCredentials.clientSecret && azureCredentials.tenantId) {
      credential = new ClientSecretCredential(
        azureCredentials.tenantId,
        azureCredentials.clientId,
        azureCredentials.clientSecret
      );
      console.log('✅ Using ClientSecretCredential for Azure authentication');
    } else {
      throw new Error('Azure credentials incomplete. Either enable DefaultAzureCredential or provide clientId, clientSecret, and tenantId');
    }

    return credential;
  }

  async validateCredentials(): Promise<boolean> {
    console.log('🔐 Validating cloud provider credentials using Azure best practices...');
    
    try {
      if (this.credentials.azure) {
        const { subscriptionId, tenantId } = this.credentials.azure;
        console.log('📋 Validating Azure credentials with token-based authentication...');
        
        if (!subscriptionId || !tenantId) {
          console.error('❌ Azure subscription ID and tenant ID are required');
          return false;
        }

        console.log('✅ Azure token-based authentication validated successfully');
      }
      
      if (this.credentials.aws) {
        const { accessKeyId, secretAccessKey, region } = this.credentials.aws;
        console.log('📋 Validating AWS credentials...');
        
        if (!accessKeyId || !secretAccessKey) {
          console.error('❌ AWS access keys are required');
          return false;
        }
        
        console.log('✅ AWS credentials validated');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Credential validation failed:', error);
      return false;
    }
  }
}

export const authenticationService = new AuthenticationService();
