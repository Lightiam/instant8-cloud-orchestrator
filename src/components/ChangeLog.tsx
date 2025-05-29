
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

const changeLogEntries = [
  {
    version: 'v1.2.0',
    date: '2024-01-15',
    type: 'Feature',
    changes: [
      'Added workspace interface with sidebar navigation',
      'Implemented deployment history tracking',
      'Added billing integration to profile settings',
      'Created monitoring dashboard',
      'Added database management interface'
    ]
  },
  {
    version: 'v1.1.0',
    date: '2024-01-10',
    type: 'Enhancement',
    changes: [
      'Improved onboarding flow',
      'Enhanced cloud provider setup',
      'Added preferences configuration',
      'Updated billing setup process'
    ]
  },
  {
    version: 'v1.0.0',
    date: '2024-01-01',
    type: 'Release',
    changes: [
      'Initial release of Instant8',
      'Multi-cloud deployment platform',
      'Basic authentication system',
      'Landing page and hero section'
    ]
  }
];

export function ChangeLog() {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Feature': return 'bg-green-100 text-green-800';
      case 'Enhancement': return 'bg-blue-100 text-blue-800';
      case 'Release': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Change Log</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription>Track updates and new features</CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {changeLogEntries.map((entry, index) => (
            <div key={index} className="border-l-2 border-muted pl-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">{entry.version}</h4>
                <Badge className={getTypeColor(entry.type)}>
                  {entry.type}
                </Badge>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </div>
              <ul className="space-y-1">
                {entry.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="text-sm text-muted-foreground">
                    • {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
