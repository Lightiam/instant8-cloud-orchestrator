
import { DeploymentConfig } from '@/services/deploymentService';

interface AIResponse {
  content: string;
  config?: DeploymentConfig;
  generateIaC?: boolean;
}

export const generateAIResponse = (userInput: string, credentialsValid: boolean): AIResponse => {
  const input = userInput.toLowerCase();
  
  if (!credentialsValid) {
    return {
      content: "I see you'd like to deploy infrastructure, but I notice your credentials aren't configured yet. Please set up your cloud provider credentials above to enable real deployments. Once configured, I can generate actual Infrastructure as Code for your requirements!"
    };
  }

  // Check for deployment-related keywords
  const deploymentKeywords = ['deploy', 'create', 'provision', 'infrastructure', 'server', 'database', 'application'];
  const hasDeploymentIntent = deploymentKeywords.some(keyword => input.includes(keyword));

  if (hasDeploymentIntent) {
    // Parse the requirements
    let config: DeploymentConfig = {
      os: 'Ubuntu 22.04 LTS',
      cpu: '4 cores',
      ram: '8GB',
      storage: '50GB SSD',
      region: 'us-east-1',
      type: 'web-application'
    };

    // Enhanced parsing logic
    if (input.includes('rag') || input.includes('ai') || input.includes('ml') || input.includes('machine learning')) {
      config.type = 'machine-learning';
      config.cpu = '8 cores';
      config.ram = '16GB';
      config.storage = '100GB SSD';
    }

    if (input.includes('database') || input.includes('postgres') || input.includes('mysql')) {
      config.type = 'database';
      config.ram = '16GB';
      config.storage = '200GB SSD';
    }

    // Parse specific requirements
    if (input.includes('16gb') || input.includes('16 gb')) {
      config.ram = '16GB';
    }
    if (input.includes('32gb') || input.includes('32 gb')) {
      config.ram = '32GB';
    }
    if (input.includes('gpu')) {
      config.type = 'machine-learning';
      config.cpu = '16 cores';
      config.ram = '32GB';
    }

    if (input.includes('azure') || input.includes('microsoft')) {
      config.region = 'East US';
    }
    if (input.includes('aws') || input.includes('amazon')) {
      config.region = 'us-east-1';
    }
    if (input.includes('gcp') || input.includes('google')) {
      config.region = 'us-central1';
    }

    return {
      content: `Perfect! I've analyzed your requirements and generated a comprehensive infrastructure configuration for your ${config.type.replace('-', ' ')} deployment.

**Configuration Summary:**
- **OS**: ${config.os}
- **CPU**: ${config.cpu}
- **RAM**: ${config.ram}
- **Storage**: ${config.storage}
- **Region**: ${config.region}
- **Type**: ${config.type.replace('-', ' ').toUpperCase()}

I'm now generating the Infrastructure as Code (IaC) for this configuration. You'll be able to review the generated Pulumi and Terraform code before deployment. This will create:

🖥️ **Compute**: EC2 instance with specified resources
🗄️ **Database**: PostgreSQL RDS instance for vector storage
🌐 **Network**: VPC, subnets, security groups, and load balancer
🔒 **Security**: SSL certificates and proper access controls
📊 **Monitoring**: CloudWatch logging and metrics

The estimated monthly cost will be approximately **$47-85** depending on usage.

Would you like me to proceed with generating the Infrastructure as Code?`,
      config,
      generateIaC: true
    };
  }

  // Handle other types of queries
  const responses = [
    "I can help you deploy various types of infrastructure! Tell me what you'd like to deploy - for example: 'Deploy a web application with PostgreSQL database' or 'Create a machine learning environment with GPU support'.",
    "What kind of infrastructure would you like me to help you deploy? I can create configurations for web applications, databases, ML workloads, and more. Just describe your requirements!",
    "I'm ready to help you provision cloud infrastructure! Whether you need a simple web server, a complex ML pipeline, or a scalable database, just describe what you want to deploy.",
  ];

  return {
    content: responses[Math.floor(Math.random() * responses.length)]
  };
};

export const getWelcomeMessage = (credentialsValid: boolean): string => {
  if (credentialsValid) {
    return `🚀 **Welcome to the AI Infrastructure Assistant!**

Your cloud credentials are configured and ready. I can help you:

✨ **Generate Infrastructure as Code** - Describe your needs and I'll create Pulumi/Terraform code
🌐 **Deploy Real Infrastructure** - Provision actual cloud resources on AWS, Azure, or GCP  
🏗️ **RAG Applications** - Set up AI-powered applications with vector databases
📊 **ML Workloads** - Configure GPU instances and ML frameworks
🗄️ **Databases** - Deploy PostgreSQL, MySQL, or vector databases

Just describe what you want to deploy and I'll generate the Infrastructure as Code for you to review before deployment!

**Example:** "Deploy a RAG application with vector database on AWS"`;
  }
  
  return `👋 **Welcome to the AI Infrastructure Assistant!**

I can help you generate Infrastructure as Code and deploy real cloud infrastructure, but first you'll need to configure your cloud provider credentials above.

Once configured, I can:
- Generate Pulumi and Terraform code
- Deploy to AWS, Azure, or GCP
- Create RAG applications with vector databases
- Set up ML environments with GPU support

Please configure your credentials above to get started with real deployments!`;
};
