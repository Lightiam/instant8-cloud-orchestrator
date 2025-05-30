
import { useState } from 'react';
import { deploymentService, DeploymentCredentials } from '@/services/deploymentService';
import { toast } from 'sonner';

export function useCredentials(onCredentialsSet: (isValid: boolean) => void) {
  const [credentials, setCredentials] = useState<DeploymentCredentials>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateAndSetCredentials = async (newCredentials: DeploymentCredentials) => {
    setIsValidating(true);
    setCredentials(newCredentials);
    deploymentService.setCredentials(newCredentials);
    
    try {
      const valid = await deploymentService.validateCredentials();
      setIsValid(valid);
      onCredentialsSet(valid);
      
      if (valid) {
        toast.success('Credentials validated successfully using Azure best practices!');
      } else {
        toast.error('Invalid credentials. Please check and try again.');
      }
    } catch (error) {
      toast.error('Failed to validate credentials');
      setIsValid(false);
      onCredentialsSet(false);
    } finally {
      setIsValidating(false);
    }
  };

  return {
    credentials,
    isValidating,
    isValid,
    validateAndSetCredentials
  };
}
