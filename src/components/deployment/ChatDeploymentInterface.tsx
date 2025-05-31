
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DeploymentConfig } from '@/services/deploymentService';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatStatusIndicator } from './ChatStatusIndicator';
import { generateAIResponse, getWelcomeMessage } from '@/utils/aiResponseGenerator';

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
      content: getWelcomeMessage(credentialsValid),
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
      content: getWelcomeMessage(credentialsValid),
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
      const aiResponse = generateAIResponse(input, credentialsValid);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Chat Messages - with proper bottom padding to avoid overlap */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4 pb-20">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <TypingIndicator show={isTyping} />
          </div>
        </ScrollArea>

        {/* Chat Input - positioned at bottom */}
        <div className="border-t bg-white">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            onKeyPress={handleKeyPress}
            disabled={isTyping || !credentialsValid}
            credentialsValid={credentialsValid}
          />
          <div className="px-4 pb-2">
            <ChatStatusIndicator credentialsValid={credentialsValid} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
