
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Activity } from 'lucide-react';

const StatsCard: React.FC = () => {
  const { state } = useGame();
  const caloriePercentage = (state.dailyCalories / state.dailyGoal) * 100;
  
  return (
    <div className="glass-card space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-foreground">Today's Progress</h3>
        <span className="text-xs bg-teal/10 text-teal px-2 py-1 rounded-full">
          Day Streak: {state.streakDays}
        </span>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Flame className="w-4 h-4 mr-1 text-orange" />
            <span className="text-sm text-foreground">Calories Burned</span>
          </div>
          <span className="text-sm font-medium text-foreground">{state.dailyCalories}/{state.dailyGoal}</span>
        </div>
        <Progress 
          value={caloriePercentage} 
          className="h-2" 
          indicatorClassName={`${caloriePercentage >= 100 ? 'bg-green' : 'bg-orange'}`} 
        />
        {caloriePercentage >= 100 && (
          <div className="mt-1 text-xs text-green flex items-center">
            <Trophy className="w-3 h-3 mr-1" />
            Daily goal achieved! Great job!
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center text-orange mb-1">
            <Flame className="w-4 h-4 mr-1" />
            <h4 className="text-sm font-medium text-foreground">Total Calories</h4>
          </div>
          <p className="text-xl font-bold text-foreground">{state.player.calories}</p>
        </div>
        
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center text-green mb-1">
            <Trophy className="w-4 h-4 mr-1" />
            <h4 className="text-sm font-medium text-foreground">Quests Done</h4>
          </div>
          <p className="text-xl font-bold text-foreground">{state.questsCompleted}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
