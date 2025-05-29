
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Cloud, RefreshCw } from 'lucide-react';

const deploymentHistory = [
  {
    id: '1',
    name: 'web-app-prod',
    provider: 'AWS',
    status: 'Success',
    timestamp: '2024-01-15 14:30:00',
    cost: '$12.45',
  },
  {
    id: '2',
    name: 'api-service',
    provider: 'Azure',
    status: 'Failed',
    timestamp: '2024-01-15 13:15:00',
    cost: '$0.00',
  },
  {
    id: '3',
    name: 'database-backup',
    provider: 'Google Cloud',
    status: 'Success',
    timestamp: '2024-01-15 12:00:00',
    cost: '$8.90',
  },
];

export function DeploymentHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Deployment History</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Track your deployment history across all cloud providers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deploymentHistory.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell className="font-medium">{deployment.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      {deployment.provider}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={deployment.status === 'Success' ? 'default' : 'destructive'}
                    >
                      {deployment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{deployment.timestamp}</TableCell>
                  <TableCell>{deployment.cost}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
