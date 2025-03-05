
import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Menu, Bell, Settings } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from '@/components/ThemeToggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border">
      <div className="container flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 pt-6">
                <Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Flame className="w-6 h-6 text-red" />
                  <span className="font-bold">Home</span>
                </Link>
                <Link to="/battle" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Flame className="w-6 h-6 text-orange" />
                  <span className="font-bold">Battle</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Flame className="w-6 h-6 text-teal" />
                  <span className="font-bold">Profile</span>
                </Link>
                <Link to="/quests" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Flame className="w-6 h-6 text-green" />
                  <span className="font-bold">Quests</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center space-x-2">
            <Flame className="w-8 h-8 text-red animate-pulse-slow" />
            <h1 className="text-xl font-bold hidden sm:block">Monster Burner</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Settings className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Appearance</h3>
                <ThemeToggle />
              </div>
            </PopoverContent>
          </Popover>
          
          <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
