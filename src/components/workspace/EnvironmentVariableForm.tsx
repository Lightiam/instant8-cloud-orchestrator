
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

interface EnvironmentVariableFormProps {
  newVar: { key: string; value: string; provider: string };
  provider: string;
  onKeyChange: (key: string) => void;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
}

export function EnvironmentVariableForm({ 
  newVar, 
  provider, 
  onKeyChange, 
  onValueChange, 
  onSubmit 
}: EnvironmentVariableFormProps) {
  return (
    <div className="border-t pt-4 space-y-3">
      <Label className="text-sm font-medium">Add New Variable:</Label>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <Label htmlFor="key">Variable Name</Label>
          <Input
            id="key"
            placeholder="e.g., AWS_ACCESS_KEY_ID"
            value={newVar.provider === provider ? newVar.key : ''}
            onChange={(e) => onKeyChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="password"
            placeholder="Enter the value"
            value={newVar.provider === provider ? newVar.value : ''}
            onChange={(e) => onValueChange(e.target.value)}
          />
        </div>
        <Button onClick={onSubmit} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Variable
        </Button>
      </div>
    </div>
  );
}
