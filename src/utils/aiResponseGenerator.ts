
import { DeploymentConfig } from '@/services/deploymentService';

interface AIResponse {
  content: string;
  config: DeploymentConfig | null;
}

export function generateAIResponse(userInput: string, credentialsValid: boolean): AIResponse {
  const input_lower = userInput.toLowerCase();
  
  if (!credentialsValid) {
    return {
      content: "I'd love to help you deploy that! However, I need your cloud provider credentials to be configured first. Please set up your Pulumi, AWS, Azure, or GCP credentials in the panel above, then we can proceed with your deployment.",
      config: null
    };
  }
  
  if (input_lower.includes('web app') || input_lower.includes('website') || input_lower.includes('frontend')) {
    return {
      content: "Perfect! I'll set up a production-ready web application deployment for you. Based on your requirements, I'm configuring:\n\n✅ **Server**: Ubuntu 22.04 with Nginx + SSL\n✅ **Resources**: 4 CPU cores, 8GB RAM\n✅ **Storage**: 50GB SSD with backup\n✅ **Features**: Auto-scaling, load balancing, CDN\n✅ **Security**: Firewall, SSL certificates\n✅ **Region**: US-East (optimized for performance)\n\n💰 **Estimated cost**: $89-127/month depending on provider\n\nReady to deploy? I'll show you the configuration preview next where you can choose your cloud provider and review all settings before deployment.",
      config: {
        os: 'Ubuntu 22.04 LTS',
        cpu: '4 cores',
        ram: '8GB',
        storage: '50GB SSD',
        region: 'US-East-1',
        type: 'web-application'
      }
    };
  } else if (input_lower.includes('ml') || input_lower.includes('machine learning') || input_lower.includes('gpu') || input_lower.includes('ai')) {
    return {
      content: "Excellent! I'm configuring a high-performance ML environment with real GPU support:\n\n🚀 **Compute**: 8 CPU cores + NVIDIA GPU (A10G/V100)\n🧠 **Memory**: 32GB RAM + 16GB GPU memory\n💾 **Storage**: 200GB NVMe SSD + 1TB data volume\n🐍 **ML Stack**: Python 3.11, PyTorch, TensorFlow, CUDA 12\n📊 **Tools**: Jupyter Lab, MLflow, Weights & Biases\n🔒 **Security**: VPC, SSH key access, encrypted storage\n\n💰 **Estimated cost**: $342-450/month for GPU instance\n\nThis includes everything you need for model training, inference, and experiment tracking. Ready to proceed?",
      config: {
        os: 'Ubuntu 22.04 LTS',
        cpu: '8 cores + GPU',
        ram: '32GB',
        storage: '200GB SSD + 1TB',
        region: 'US-West-2',
        type: 'machine-learning'
      }
    };
  } else if (input_lower.includes('database') || input_lower.includes('db') || input_lower.includes('postgres') || input_lower.includes('mysql')) {
    return {
      content: "Great choice! I'm setting up a production-grade database cluster:\n\n🗄️ **Database**: PostgreSQL 15 (or your preferred engine)\n⚡ **Performance**: 4 CPU cores, 16GB RAM, optimized SSD\n🔄 **High Availability**: Multi-AZ deployment with failover\n💾 **Backup**: Automated daily backups, 30-day retention\n📊 **Monitoring**: Performance insights, alerting\n🔒 **Security**: Encryption at rest/transit, VPC isolation\n🌐 **Scaling**: Read replicas, connection pooling\n\n💰 **Estimated cost**: $156-210/month with HA\n\nIncludes monitoring dashboard and automated maintenance. Should I proceed with this configuration?",
      config: {
        os: 'Ubuntu 22.04 LTS',
        cpu: '4 cores',
        ram: '16GB',
        storage: '100GB SSD + Backup',
        region: 'US-East-1',
        type: 'database'
      }
    };
  } else if (input_lower.includes('api') || input_lower.includes('backend') || input_lower.includes('microservice')) {
    return {
      content: "Perfect for API development! I'm configuring a scalable backend infrastructure:\n\n🔧 **Runtime**: Node.js/Python with containerization\n📦 **Container**: Docker + Kubernetes orchestration\n⚡ **Resources**: 2-8 CPU cores (auto-scaling)\n💾 **Memory**: 4-16GB RAM (elastic)\n🌐 **Network**: Load balancer, API gateway\n📊 **Monitoring**: APM, logging, metrics\n🔄 **CI/CD**: Automated deployment pipeline\n\n💰 **Estimated cost**: $67-134/month (scales with usage)\n\nIncludes SSL, monitoring, and automatic scaling. Ready to deploy your API?",
      config: {
        os: 'Container (Ubuntu base)',
        cpu: '2-8 cores (auto-scale)',
        ram: '4-16GB (elastic)',
        storage: '50GB SSD',
        region: 'US-East-1',
        type: 'api-backend'
      }
    };
  } else {
    return {
      content: "I'd be happy to help you deploy that! To give you the best configuration, could you provide more details?\n\n🎯 **What type of application?**\n• Web application (React, Vue, static site)\n• API/Backend service (Node.js, Python, Go)\n• Database (PostgreSQL, MySQL, MongoDB)\n• ML/AI workload (training, inference)\n• Container application (Docker, Kubernetes)\n\n📊 **What's your expected usage?**\n• Small project (< 1000 users)\n• Growing startup (1K-10K users)\n• Production app (10K+ users)\n\n🌍 **Any specific requirements?**\n• Preferred cloud provider (AWS, Azure, GCP)\n• Specific region\n• Budget constraints\n• Compliance needs\n\nThe more details you provide, the better I can optimize your infrastructure!",
      config: null
    };
  }
}

export function getWelcomeMessage(credentialsValid: boolean): string {
  return credentialsValid 
    ? "🎉 Great! Your credentials are configured. I can now deploy real infrastructure for you. Tell me what you'd like to deploy:\n\n• 'Deploy a web application with auto-scaling on AWS'\n• 'I need a machine learning pipeline with GPU support'\n• 'Set up a database cluster with backup and monitoring'\n\nWhat would you like to deploy today?"
    : "Hello! I'm your AI deployment assistant. To deploy real infrastructure, you'll need to configure your cloud provider credentials first. Once configured, I can help you deploy applications, ML pipelines, databases, and more.\n\nPlease set up your credentials in the panel above to get started.";
}
