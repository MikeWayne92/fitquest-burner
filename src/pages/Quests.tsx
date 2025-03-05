
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, CheckCircle, Circle, Clock, Flame } from 'lucide-react';
import { toast } from 'sonner';

// Sample quest data
const dailyQuests = [
  {
    id: 'quest1',
    title: 'Morning Energizer',
    description: 'Burn 200 calories before noon',
    reward: '50 XP',
    progress: 0,
    goal: 200,
    completed: false,
  },
  {
    id: 'quest2',
    title: 'Consistent Effort',
    description: 'Complete 3 workout sessions',
    reward: '100 XP',
    progress: 1,
    goal: 3,
    completed: false,
  },
  {
    id: 'quest3',
    title: 'Boss Slayer',
    description: 'Defeat the Inferno Dragon boss',
    reward: '200 XP + Epic Item',
    progress: 0,
    goal: 1,
    completed: false,
  },
];

const weeklyQuests = [
  {
    id: 'quest4',
    title: 'Weekly Warrior',
    description: 'Burn 1000 calories this week',
    reward: '300 XP + Rare Item',
    progress: 350,
    goal: 1000,
    completed: false,
  },
  {
    id: 'quest5',
    title: 'Monster Hunter',
    description: 'Defeat 5 different monsters',
    reward: '250 XP',
    progress: 2,
    goal: 5,
    completed: false,
  },
];

const Quests: React.FC = () => {
  const { state } = useGame();
  
  const handleClaimReward = (questId: string, questTitle: string) => {
    toast.success(`Reward claimed for ${questTitle}!`, {
      description: "Check your inventory for new items!"
    });
  };
  
  const QuestItem = ({ quest }: { quest: typeof dailyQuests[0] }) => {
    const progressPercentage = (quest.progress / quest.goal) * 100;
    const isComplete = progressPercentage >= 100;
    
    return (
      <div className="neo-card-small">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {isComplete ? (
              <CheckCircle className="w-5 h-5 text-green mr-2 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground mr-2 flex-shrink-0" />
            )}
            <h3 className="font-bold">{quest.title}</h3>
          </div>
          <div className="text-xs bg-teal/10 text-teal px-2 py-1 rounded-full">
            {quest.reward}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{quest.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span>Progress</span>
            <span>{quest.progress}/{quest.goal}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2" 
            indicatorClassName={isComplete ? 'bg-green' : 'bg-teal'} 
          />
        </div>
        
        {isComplete && (
          <Button 
            className="w-full mt-3 bg-green hover:bg-green/90"
            onClick={() => handleClaimReward(quest.id, quest.title)}
          >
            Claim Reward
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <h1 className="font-bold text-2xl flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-green" />
        Quests & Challenges
      </h1>
      
      <div className="glass-card">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange" />
          </div>
          <div>
            <h2 className="font-bold">Daily Calorie Challenge</h2>
            <p className="text-sm text-muted-foreground">Burn {state.dailyGoal} calories today!</p>
            
            <div className="mt-2">
              <div className="flex justify-between items-center text-xs mb-1">
                <span>Progress</span>
                <span>{state.dailyCalories}/{state.dailyGoal}</span>
              </div>
              <Progress 
                value={(state.dailyCalories / state.dailyGoal) * 100} 
                className="h-2" 
                indicatorClassName="bg-orange" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-teal" />
            Daily Quests
          </h2>
          <div className="text-sm flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Resets in 12h 30m
          </div>
        </div>
        
        <div className="space-y-3">
          {dailyQuests.map(quest => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple" />
            Weekly Challenges
          </h2>
          <div className="text-sm flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Resets in 4d 6h
          </div>
        </div>
        
        <div className="space-y-3">
          {weeklyQuests.map(quest => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quests;
