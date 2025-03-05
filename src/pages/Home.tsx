
import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import PlayerCard from '@/components/game/PlayerCard';
import StatsCard from '@/components/game/StatsCard';
import CalorieInput from '@/components/game/CalorieInput';
import { Button } from '@/components/ui/button';
import { ArrowRight, Swords, Trophy, Activity } from 'lucide-react';

const Home: React.FC = () => {
  const { state } = useGame();
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <PlayerCard player={state.player} compact />
      
      <StatsCard />
      
      <CalorieInput />
      
      <div className="space-y-4">
        <h2 className="font-bold text-lg">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/battle" className="neo-card-small flex items-center space-x-3 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center">
              <Swords className="w-6 h-6 text-orange" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Battle Monsters</h3>
              <p className="text-sm text-muted-foreground">Use your energy to defeat enemies</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          
          <Link to="/quests" className="neo-card-small flex items-center space-x-3 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Daily Quests</h3>
              <p className="text-sm text-muted-foreground">Complete challenges for rewards</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-r from-purple/20 to-teal/20 border border-white/20">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center mr-3 flex-shrink-0">
            <Activity className="w-6 h-6 text-purple" />
          </div>
          <div>
            <h3 className="font-bold">Connect Your Fitness App</h3>
            <p className="text-sm mt-1">Link your Apple Health or other fitness tracker to automatically track calories burned.</p>
            <Button className="mt-3 bg-purple hover:bg-purple/90">Connect Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
