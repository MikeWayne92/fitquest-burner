
import React from 'react';
import { Monster } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { Heart, Shield, Flame, Skull } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonsterCardProps {
  monster: Monster;
  isActive?: boolean;
  isDefeated?: boolean;
}

const MonsterCard: React.FC<MonsterCardProps> = ({ monster, isActive = false, isDefeated = false }) => {
  const healthPercentage = (monster.hp / monster.maxHp) * 100;
  const isDead = monster.hp <= 0 || isDefeated;
  
  return (
    <div className={cn(
      "neo-card transform transition-all duration-300", 
      isActive ? 'scale-105 border-2 border-orange' : '',
      isDead ? 'grayscale brightness-75 border-2 border-red/30' : ''
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg">{monster.name}</h3>
          <p className="text-sm text-muted-foreground">Level {monster.level}</p>
        </div>
        {monster.isBoss && (
          <span className="bg-red/20 text-red px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Flame className="w-3 h-3 mr-1" />
            BOSS
          </span>
        )}
      </div>
      
      <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-muted to-transparent"></div>
        <div className={`w-32 h-32 ${isActive ? 'animate-float' : ''}`}>
          {monster.image ? (
            <img 
              src={monster.image} 
              alt={monster.name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className={`w-full h-full rounded-full ${monster.isBoss ? 'bg-red/20' : 'bg-orange/20'} flex items-center justify-center`}>
              <Flame className={`w-16 h-16 ${monster.isBoss ? 'text-red' : 'text-orange'}`} />
            </div>
          )}
        </div>
        
        {isDead && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Skull className="w-16 h-16 text-red animate-pulse-slow" />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1 text-red" />
            <span className="text-sm">HP</span>
          </div>
          <span className="text-sm font-medium">{monster.hp}/{monster.maxHp}</span>
        </div>
        <Progress value={healthPercentage} className="h-2" indicatorClassName="bg-red" />
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
            <Flame className="w-4 h-4 text-orange" />
            <div>
              <p className="text-xs text-muted-foreground">Attack</p>
              <p className="font-medium">{monster.attack}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
            <Shield className="w-4 h-4 text-teal" />
            <div>
              <p className="text-xs text-muted-foreground">Defense</p>
              <p className="font-medium">{monster.defense}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;
