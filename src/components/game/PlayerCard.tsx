
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Heart, Shield, Flame, Zap, Trophy } from 'lucide-react';
import { Player } from '@/context/GameContext';

interface PlayerCardProps {
  player: Player;
  compact?: boolean;
}

const avatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
];

const PlayerCard: React.FC<PlayerCardProps> = ({ player, compact = false }) => {
  const healthPercentage = (player.hp / player.maxHp) * 100;
  const xpPercentage = (player.xp / player.xpToNextLevel) * 100;
  
  if (compact) {
    return (
      <div className="glass-card flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center">
          {/* Placeholder for player avatar */}
          <Trophy className="w-6 h-6 text-purple" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-foreground">{player.name}</h3>
            <span className="text-xs bg-purple/10 text-purple px-2 py-1 rounded-full">
              LVL {player.level}
            </span>
          </div>
          
          <div className="space-y-1 mt-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Heart className="w-3 h-3 mr-1 text-red" />
                <span className="text-foreground">HP</span>
              </div>
              <span className="text-foreground">{player.hp}/{player.maxHp}</span>
            </div>
            <Progress value={healthPercentage} className="h-1.5" indicatorClassName="bg-red" />
            
            <div className="flex items-center justify-between text-xs mt-1">
              <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1 text-green" />
                <span className="text-foreground">XP</span>
              </div>
              <span className="text-foreground">{player.xp}/{player.xpToNextLevel}</span>
            </div>
            <Progress value={xpPercentage} className="h-1.5" indicatorClassName="bg-green" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="neo-card">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-purple/10 flex items-center justify-center">
          {/* Placeholder for player avatar */}
          <Trophy className="w-8 h-8 text-purple" />
        </div>
        
        <div>
          <h3 className="font-bold text-lg text-foreground">{player.name}</h3>
          <div className="flex items-center">
            <span className="text-xs bg-purple/10 text-purple px-2 py-1 rounded-full inline-flex items-center">
              <Trophy className="w-3 h-3 mr-1" />
              Level {player.level}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              {player.xp}/{player.xpToNextLevel} XP
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-red" />
              <span className="text-sm text-foreground">Health</span>
            </div>
            <span className="text-sm font-medium text-foreground">{player.hp}/{player.maxHp}</span>
          </div>
          <Progress value={healthPercentage} className="h-2" indicatorClassName="bg-red" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1 text-green" />
              <span className="text-sm text-foreground">Experience</span>
            </div>
            <span className="text-sm font-medium text-foreground">{player.xp}/{player.xpToNextLevel}</span>
          </div>
          <Progress value={xpPercentage} className="h-2" indicatorClassName="bg-green" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
          <Flame className="w-4 h-4 text-orange" />
          <div>
            <p className="text-xs text-muted-foreground">Attack</p>
            <p className="font-medium text-foreground">{player.attack}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
          <Shield className="w-4 h-4 text-teal" />
          <div>
            <p className="text-xs text-muted-foreground">Defense</p>
            <p className="font-medium text-foreground">{player.defense}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
