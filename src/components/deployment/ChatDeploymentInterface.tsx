
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatDeploymentInterfaceProps {
  onConfigGenerated: (config: any) => void;
}

export function ChatDeploymentInterface({ onConfigGenerated }: ChatDeploymentInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI deployment assistant. Tell me what you'd like to deploy and I'll help you configure the perfect infrastructure. For example, you could say:\n\n• 'Deploy a web application with auto-scaling on AWS'\n• 'I need a machine learning pipeline with GPU support'\n• 'Set up a database cluster with backup and monitoring'\n\nWhat would you like to deploy today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        timestamp: new Date()
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
    
    if (input_lower.includes('web app') || input_lower.includes('website') || input_lower.includes('frontend')) {
      return {
        content: "Perfect! I'll set up a web application deployment for you. Based on your requirements, I'm configuring:\n\n• **Server**: Ubuntu 22.04 with Nginx\n• **Resources**: 4 CPU cores, 8GB RAM\n• **Storage**: 50GB SSD\n• **Features**: SSL certificate, CDN, auto-scaling\n• **Region**: US-East (recommended for performance)\n\nWould you like me to proceed with this configuration, or would you like to modify anything? For example, do you need a specific region or additional resources?",
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
        content: "Excellent choice for machine learning! I'm setting up a high-performance ML environment:\n\n• **Server**: Ubuntu 22.04 with CUDA support\n• **GPU**: NVIDIA A10G or equivalent\n• **Resources**: 8 CPU cores, 32GB RAM\n• **Storage**: 200GB SSD + 1TB data volume\n• **Software**: Docker, Python 3.11, PyTorch, TensorFlow\n• **Region**: US-West-2 (GPU availability)\n\nThis configuration supports model training, inference, and includes Jupyter notebook access. Ready to deploy?",
        config: {
          os: 'Ubuntu 22.04 LTS',
          cpu: '8 cores',
          ram: '32GB',
          storage: '200GB SSD',
          region: 'US-West-2',
          type: 'machine-learning'
        }
      };
    } else if (input_lower.includes('database') || input_lower.includes('db') || input_lower.includes('postgres') || input_lower.includes('mysql')) {
      return {
        content: "Great! I'll configure a robust database deployment:\n\n• **Database**: PostgreSQL 15 (or your preferred engine)\n• **Resources**: 4 CPU cores, 16GB RAM\n• **Storage**: 100GB SSD with automatic backups\n• **Features**: High availability, monitoring, SSL\n• **Backup**: Daily automated backups with 30-day retention\n• **Region**: US-East-1\n\nIncludes connection pooling and read replicas for optimal performance. Should I proceed with this setup?",
        config: {
          os: 'Ubuntu 22.04 LTS',
          cpu: '4 cores',
          ram: '16GB',
          storage: '100GB SSD',
          region: 'US-East-1',
          type: 'database'
        }
      };
    } else {
      return {
        content: "I understand you want to deploy something, but could you provide more details? Here are some examples to help me assist you better:\n\n• **Type of application**: Web app, API, database, ML model?\n• **Expected traffic**: Small team, thousands of users, enterprise scale?\n• **Special requirements**: GPU for AI, specific region, compliance needs?\n• **Budget considerations**: Cost-optimized or performance-focused?\n\nThe more details you provide, the better I can tailor the infrastructure to your needs!",
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
                    <span className="text-sm">AI is thinking...</span>
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
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe what you want to deploy... (Press Enter to send, Shift+Enter for new line)"
              className="flex-1 min-h-[40px] max-h-[120px] resize-none"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="self-end"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Powered by AI • Instant deployment configuration</span>
            <span>Press Enter to send</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
