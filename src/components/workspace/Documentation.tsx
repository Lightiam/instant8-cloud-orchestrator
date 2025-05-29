
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function Documentation() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to integrate with Instant8 APIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p>Documentation content will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
