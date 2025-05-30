
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

interface TypingIndicatorProps {
  show: boolean;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
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
  );
}

export function TypingIndicator({ show }: TypingIndicatorProps) {
  if (!show) return null;

  return (
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
  );
}
