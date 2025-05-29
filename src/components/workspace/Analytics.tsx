
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>

      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>Track performance metrics and usage statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto mb-2" />
              <p>Analytics data will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
