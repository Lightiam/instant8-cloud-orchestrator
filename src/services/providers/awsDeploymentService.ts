
import { authenticationService } from '../auth/authenticationService';
import { DeploymentConfig, DeploymentResult } from '../deploymentService';

class AWSDeploymentService {
  async validateCredentials(): Promise<boolean> {
    console.log('✅ AWS deployment service disabled - focusing on Azure only');
    return false;
  }

  async deploy(config: DeploymentConfig, deploymentId: string, logs: string[]): Promise<DeploymentResult> {
    throw new Error('AWS deployment is not configured. Please use Azure deployment.');
  }
}

export const awsDeploymentService = new AWSDeploymentService();
