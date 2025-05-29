
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Monitor, 
  History, 
  CreditCard, 
  Settings, 
  User,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Instant8</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={() => navigate('/workspace/deploy')}
            >
              <Cloud className="w-4 h-4" />
              <span>Deploy</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={() => navigate('/workspace/monitor')}
            >
              <Monitor className="w-4 h-4" />
              <span>Monitor</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={() => navigate('/workspace/history')}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </nav>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuLabel className="text-sm font-normal text-muted-foreground">
                john.doe@company.com
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/workspace/settings')}>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing & Subscription
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
