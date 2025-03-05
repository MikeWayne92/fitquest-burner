
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Laptop } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { state, setTheme } = useGame();
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={state.theme === 'light' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setTheme('light')}
        className="w-9 p-0 transition-all"
      >
        <Sun className="h-4 w-4" />
      </Button>
      
      <Button
        variant={state.theme === 'dark' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setTheme('dark')}
        className="w-9 p-0 transition-all"
      >
        <Moon className="h-4 w-4" />
      </Button>
      
      <Button
        variant={state.theme === 'system' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setTheme('system')}
        className="w-9 p-0 transition-all"
      >
        <Laptop className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ThemeToggle;
