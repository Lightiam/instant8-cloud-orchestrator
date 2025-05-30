
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

interface EnvVariable {
  key: string;
  value: string;
  provider: string;
}

interface EnvironmentVariablesListProps {
  envVars: EnvVariable[];
  provider: string;
  showValues: Record<string, boolean>;
  onToggleShow: (key: string) => void;
  onDelete: (index: number) => void;
}

export function EnvironmentVariablesList({ 
  envVars, 
  provider, 
  showValues, 
  onToggleShow, 
  onDelete 
}: EnvironmentVariablesListProps) {
  const providerVars = envVars.filter(v => v.provider === provider);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Configured Variables:</Label>
      {providerVars.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No variables configured yet</p>
      ) : (
        <div className="space-y-2">
          {providerVars.map((envVar, index) => {
            const globalIndex = envVars.findIndex(v => v === envVar);
            const showKey = `${envVar.key}-${globalIndex}`;
            
            return (
              <div key={showKey} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-gray-100 px-1 rounded">{envVar.key}</code>
                    <Badge variant="outline" className="text-xs">
                      {provider.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs text-gray-600">
                      {showValues[showKey] 
                        ? envVar.value 
                        : '•'.repeat(Math.min(envVar.value.length, 20))
                      }
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onToggleShow(showKey)}
                  >
                    {showValues[showKey] ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(globalIndex)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
