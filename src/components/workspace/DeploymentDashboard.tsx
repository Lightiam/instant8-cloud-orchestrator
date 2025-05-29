
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Plus, Settings } from 'lucide-react';

export function DeploymentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Deploy</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$847.92</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Deploy</CardTitle>
          <CardDescription>Deploy your applications to multiple cloud providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Cloud className="h-6 w-6" />
              <span>AWS</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Cloud className="h-6 w-6" />
              <span>Azure</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Cloud className="h-6 w-6" />
              <span>Google Cloud</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
