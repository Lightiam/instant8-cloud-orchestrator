
import React from 'react';
import { 
  Cloud, 
  Monitor, 
  History, 
  Settings, 
  FileText,
  Database,
  Activity
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const items = [
  { title: 'Deploy', url: '/workspace/deploy', icon: Cloud },
  { title: 'Monitor', url: '/workspace/monitor', icon: Monitor },
  { title: 'History', url: '/workspace/history', icon: History },
  { title: 'Databases', url: '/workspace/databases', icon: Database },
  { title: 'Analytics', url: '/workspace/analytics', icon: Activity },
  { title: 'Documentation', url: '/workspace/docs', icon: FileText },
  { title: 'Settings', url: '/workspace/settings', icon: Settings },
];

export function WorkspaceSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"} collapsible>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
