
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Swords, User, Trophy } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/70 backdrop-blur-lg border-t border-border z-50">
      <div className="container max-w-md mx-auto">
        <div className="flex items-center justify-around h-16">
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/') ? 'text-teal' : 'text-muted-foreground'}`}>
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/battle" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/battle') ? 'text-orange' : 'text-muted-foreground'}`}>
            <Swords className="w-6 h-6" />
            <span className="text-xs mt-1">Battle</span>
          </Link>
          
          <Link to="/quests" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/quests') ? 'text-green' : 'text-muted-foreground'}`}>
            <Trophy className="w-6 h-6" />
            <span className="text-xs mt-1">Quests</span>
          </Link>
          
          <Link to="/profile" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/profile') ? 'text-purple' : 'text-muted-foreground'}`}>
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
