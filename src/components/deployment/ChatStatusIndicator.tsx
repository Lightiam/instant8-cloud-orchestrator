
import React from 'react';

interface ChatStatusIndicatorProps {
  credentialsValid: boolean;
}

export function ChatStatusIndicator({ credentialsValid }: ChatStatusIndicatorProps) {
  return (
    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
      <span>
        {credentialsValid 
          ? "🚀 Ready to generate Infrastructure as Code • Pulumi & Terraform"
          : "⚠️ Configure credentials to enable IaC generation"
        }
      </span>
      <span>Press Enter to send</span>
    </div>
  );
}
