
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  credentialsValid: boolean;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  disabled, 
  credentialsValid 
}: ChatInputProps) {
  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={credentialsValid 
            ? "Describe what you want to deploy... (Press Enter to send)"
            : "Configure your credentials above to enable deployments..."
          }
          className="flex-1 min-h-[40px] max-h-[120px] resize-none"
          disabled={disabled}
        />
        <Button 
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="self-end"
          size="icon"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
