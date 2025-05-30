
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { deploymentService, DeploymentConfig } from '@/services/deploymentService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  config?: DeploymentConfig;
}

interface ChatDeploymentInterfaceProps {
  onConfigGenerated: (config: DeploymentConfig) => void;
  credentialsValid: boolean;
}

export function ChatDeploymentInterface({ onConfigGenerated, credentialsValid }: ChatDeploymentInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: credentialsValid 
        ? "Hello! I'm your AI deployment assistant. I can help you deploy real infrastructure to AWS, Azure, or GCP using your configured credentials. Tell me what you'd like to deploy:\n\n• 'Deploy a web application with auto-scaling on AWS'\n• 'I need a machine learning pipeline with GPU support'\n• 'Set up a database cluster with backup and monitoring'\n\nWhat would you like to deploy today?"
        : "Hello! I'm your AI deployment assistant. To deploy real infrastructure, you'll need to configure your cloud provider credentials first. Once configured, I can help you deploy applications, ML pipelines, databases, and more.\n\nPlease set up your credentials in the panel above to get started.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when credentials change
  useEffect(() => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: credentialsValid 
        ? "🎉 Great! Your credentials are configured. I can now deploy real infrastructure for you. Tell me what you'd like to deploy:\n\n• 'Deploy a web application with auto-scaling on AWS'\n• 'I need a machine learning pipeline with GPU support'\n• 'Set up a database cluster with backup and monitoring'\n\nWhat would you like to deploy today?"
        : "Hello! I'm your AI deployment assistant. To deploy real infrastructure, you'll need to configure your cloud provider credentials first. Once configured, I can help you deploy applications, ML pipelines, databases, and more.\n\nPlease set up your credentials in the panel above to get started.",
      timestamp: new Date()
    }]);
  }, [credentialsValid]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        config: aiResponse.config
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // If the response includes a configuration, trigger the callback
      if (aiResponse.config) {
        setTimeout(() => {
          onConfigGenerated(aiResponse.config);
        }, 1000);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Chat Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'ai' && (
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500">
                    <AvatarFallback>
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 bg-gray-500">
                    <AvatarFallback>
                      <User className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500">
                  <AvatarFallback>
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is analyzing your requirements...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={credentialsValid 
                ? "Describe what you want to deploy... (Press Enter to send)"
                : "Configure your credentials above to enable deployments..."
              }
              className="flex-1 min-h-[40px] max-h-[120px] resize-none"
              disabled={isTyping || !credentialsValid}
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping || !credentialsValid}
              className="self-end"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>
              {credentialsValid 
                ? "🚀 Ready for real deployments • AI-powered infrastructure"
                : "⚠️ Configure credentials to enable deployments"
              }
            </span>
            <span>Press Enter to send</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
