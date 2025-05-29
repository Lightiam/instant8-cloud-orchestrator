
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, CreditCard } from 'lucide-react';

export function WorkspaceSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Workspace Settings
            </CardTitle>
            <CardDescription>Configure your workspace preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Manage Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing & Subscription
            </CardTitle>
            <CardDescription>Manage your billing information and subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan: Premium</p>
              <p className="text-sm text-muted-foreground">Next billing: January 25, 2024</p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Manage Billing
              </Button>
              <Button variant="outline" className="w-full">
                View Usage
              </Button>
              <Button variant="outline" className="w-full">
                Download Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
