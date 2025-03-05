
import React, { useState } from 'react';
import { useGame, Monster } from '@/context/GameContext';
import PlayerCard from '@/components/game/PlayerCard';
import MonsterCard from '@/components/game/MonsterCard';
import { Button } from '@/components/ui/button';
import { Swords, ArrowLeft, Shield, Zap, Bomb } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const Battle: React.FC = () => {
  const { state, startBattle, attackMonster, endBattle } = useGame();
  const [attackPower, setAttackPower] = useState<number>(0);
  const [charging, setCharging] = useState<boolean>(false);
  
  // Select a monster to battle
  const selectMonster = (monster: Monster) => {
    startBattle(monster);
    toast.info(`Battle with ${monster.name} started!`, {
      description: "Use your calories to power up attacks!"
    });
  };
  
  // Charge an attack based on calories
  const chargeAttack = () => {
    setCharging(true);
    let power = 0;
    const maxPower = state.player.calories > 100 ? 100 : state.player.calories;
    
    const interval = setInterval(() => {
      power += 5;
      setAttackPower(power);
      
      if (power >= maxPower) {
        clearInterval(interval);
        setTimeout(() => {
          setCharging(false);
        }, 500);
      }
    }, 100);
  };
  
  // Execute the attack with charged power
  const executeAttack = () => {
    if (attackPower <= 0) {
      toast.error("Charge your attack first!", {
        description: "Use your calories to power up your attack."
      });
      return;
    }
    
    // Calculate damage based on attack power and player stats
    const damage = Math.floor((attackPower / 10) * state.player.attack);
    attackMonster(damage);
    setAttackPower(0);
    
    toast.success(`You dealt ${damage} damage!`, {
      description: state.currentMonster ? 
        `${state.currentMonster.name} has ${state.currentMonster.hp} HP left!` : 
        "The monster has been defeated!"
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <h1 className="font-bold text-2xl flex items-center">
        <Swords className="w-6 h-6 mr-2 text-orange" />
        Battle Arena
      </h1>
      
      {state.inBattle && state.currentMonster ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={endBattle}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retreat
            </Button>
            
            <div className="text-center">
              <h2 className="font-bold">Battle in Progress</h2>
              <p className="text-sm text-muted-foreground">Use your energy to defeat the monster!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlayerCard player={state.player} />
            <MonsterCard monster={state.currentMonster} isActive />
          </div>
          
          <div className="neo-card-small">
            <h3 className="font-bold mb-3">Attack Controls</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Attack Power</span>
                  <span className="text-sm font-medium">{attackPower}/100</span>
                </div>
                <Progress value={attackPower} className="h-3" indicatorClassName="bg-orange" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={chargeAttack} 
                  disabled={charging || state.player.calories < 10}
                  className="bg-teal hover:bg-teal/90 flex items-center justify-center"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {charging ? 'Charging...' : 'Charge Attack'}
                </Button>
                
                <Button 
                  onClick={executeAttack} 
                  disabled={attackPower <= 0}
                  className="bg-orange hover:bg-orange/90 flex items-center justify-center"
                >
                  <Bomb className="w-4 h-4 mr-2" />
                  Attack!
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>You have {state.player.calories} calories available for attacks.</p>
                <p>Each attack consumes calories based on its power.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="font-bold mb-3">Choose Your Opponent</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Select a monster to battle. Boss monsters give more rewards but are harder to defeat!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.monsters.map((monster) => (
                <div key={monster.id} className="relative">
                  <MonsterCard monster={monster} />
                  <Button 
                    onClick={() => selectMonster(monster)} 
                    className="absolute bottom-4 right-4 bg-orange hover:bg-orange/90"
                  >
                    <Swords className="w-4 h-4 mr-2" />
                    Battle
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple/10 to-teal/10 border border-white/10">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-purple mr-3" />
              <div>
                <h3 className="font-bold">Battle Tips</h3>
                <p className="text-sm text-muted-foreground">
                  The more calories you burn in real life, the more powerful your attacks will be in battle!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Battle;
