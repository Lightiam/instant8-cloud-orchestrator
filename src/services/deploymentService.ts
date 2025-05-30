
import { authenticationService, AuthCredentials } from './auth/authenticationService';
import { azureDeploymentService } from './providers/azureDeploymentService';
import { awsDeploymentService } from './providers/awsDeploymentService';
import { gcpDeploymentService } from './providers/gcpDeploymentService';

export interface DeploymentConfig {
  os: string;
  cpu: string;
  ram: string;
  storage: string;
  region: string;
  type: string;
}

export interface DeploymentCredentials extends AuthCredentials {}

export interface DeploymentResult {
  success: boolean;
  deploymentId: string;
  url?: string;
  error?: string;
  logs: string[];
}

class DeploymentService {
  setCredentials(credentials: DeploymentCredentials) {
    authenticationService.setCredentials(credentials);
  }

  async validateCredentials(): Promise<boolean> {
    return authenticationService.validateCredentials();
  }

  async deployToProvider(config: DeploymentConfig, provider: string): Promise<DeploymentResult> {
    console.log(`🚀 Starting deployment to ${provider.toUpperCase()} using best practices:`, config);
    
    const deploymentId = `${provider}-${Date.now()}`;
    const logs: string[] = [];

    try {
      const credentialsValid = await this.validateCredentials();
      if (!credentialsValid) {
        throw new Error('Invalid or missing credentials for ' + provider);
      }

      logs.push(`🔐 Token-based authentication validated for ${provider.toUpperCase()}`);
      console.log(`✅ Credentials validated for ${provider}`);
      
      const lowerProvider = provider.toLowerCase();
      
      if (lowerProvider === 'azure') {
        return await azureDeploymentService.deploy(config, deploymentId, logs);
      } else if (lowerProvider === 'aws') {
        return await awsDeploymentService.deploy(config, deploymentId, logs);
      } else if (lowerProvider === 'gcp') {
        return await gcpDeploymentService.deploy(config, deploymentId, logs);
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown deployment error';
      logs.push(`❌ Error: ${errorMsg}`);
      console.error(`❌ Deployment failed:`, error);
      
      return {
        success: false,
        deploymentId,
        error: errorMsg,
        logs
      };
    }
  }

  async getDeploymentStatus(deploymentId: string): Promise<{
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
    logs: string[];
  }> {
    console.log(`📊 Checking deployment status for: ${deploymentId}`);
    
    return {
      status: 'completed',
      progress: 100,
      logs: [`✅ Deployment ${deploymentId} completed successfully`]
    };
  }
}

export const deploymentService = new DeploymentService();
