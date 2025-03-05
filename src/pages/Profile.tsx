
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PlayerCard from '@/components/game/PlayerCard';
import { User, Settings, Medal, ChevronRight, Edit } from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { state, updatePlayer } = useGame();
  const [editing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(state.player.name);
  
  const handleSave = () => {
    if (playerName.trim() === '') {
      toast.error('Name cannot be empty');
      return;
    }
    
    updatePlayer({ name: playerName.trim() });
    setEditing(false);
    toast.success('Profile updated!');
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <h1 className="font-bold text-2xl flex items-center">
        <User className="w-6 h-6 mr-2 text-purple" />
        Profile
      </h1>
      
      <div className="neo-card">
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-bold text-lg">Your Character</h2>
          {!editing ? (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          )}
        </div>
        
        {editing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Character Name</Label>
              <Input
                id="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your character name"
              />
            </div>
            
            <Button onClick={handleSave} className="w-full bg-purple hover:bg-purple/90">
              Save Changes
            </Button>
          </div>
        ) : (
          <PlayerCard player={state.player} />
        )}
      </div>
      
      <div className="space-y-4">
        <h2 className="font-bold text-lg">Stats & Achievements</h2>
        
        <div className="neo-card-small">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center mr-3">
                <Medal className="w-5 h-5 text-orange" />
              </div>
              <div>
                <h3 className="font-medium">Total Calories Burned</h3>
                <p className="text-2xl font-bold">{state.player.calories}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="neo-card-small">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mr-3">
                <Medal className="w-5 h-5 text-green" />
              </div>
              <div>
                <h3 className="font-medium">Quests Completed</h3>
                <p className="text-2xl font-bold">{state.questsCompleted}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="neo-card-small">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mr-3">
                <Medal className="w-5 h-5 text-teal" />
              </div>
              <div>
                <h3 className="font-medium">Streak Days</h3>
                <p className="text-2xl font-bold">{state.streakDays}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div className="neo-card-small">
        <h3 className="font-bold mb-3 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-muted-foreground" />
          Settings
        </h3>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Account Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Privacy Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Notification Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start text-red">
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
