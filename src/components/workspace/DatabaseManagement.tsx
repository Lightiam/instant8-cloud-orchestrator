
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Plus } from 'lucide-react';

export function DatabaseManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Database Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Connect Database
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Databases</CardTitle>
          <CardDescription>Manage your database connections and configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Database className="h-12 w-12 mx-auto mb-2" />
              <p>No databases connected yet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
