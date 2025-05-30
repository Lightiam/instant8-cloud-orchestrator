
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Template {
  key: string;
  description: string;
}

interface ProviderTemplatesProps {
  provider: string;
  templates: Template[];
  onTemplateSelect: (key: string, provider: string) => void;
}

export function ProviderTemplates({ provider, templates, onTemplateSelect }: ProviderTemplatesProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Required Variables:</Label>
      <div className="grid gap-2">
        {templates.map((template) => (
          <div key={template.key} className="flex items-center justify-between p-2 border rounded">
            <div>
              <code className="text-sm bg-gray-100 px-1 rounded">{template.key}</code>
              <p className="text-xs text-gray-600 mt-1">{template.description}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onTemplateSelect(template.key, provider)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
