
import React, { useState, useEffect } from 'react';
import { useGame, Monster } from '@/context/GameContext';
import PlayerCard from '@/components/game/PlayerCard';
import MonsterCard from '@/components/game/MonsterCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Swords, ArrowLeft, Shield, Zap, Bomb, Skull } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const ATTACK_TYPES = {
  MAX_EFFORT: { name: 'Max Effort', multiplier: 1.5, message: 'Maximum effort! Bonus damage!' },
  NORMAL: { name: 'Normal', multiplier: 1.0, message: 'Normal attack!' },
  MINIMAL: { name: 'Minimal Effort', multiplier: 0.6, message: 'Minimal effort. Reduced damage.' },
  MISSED: { name: 'Missed', multiplier: 0, message: 'Attack missed completely!' },
};

const Battle: React.FC = () => {
  const { state, startBattle, attackMonster, endBattle, levelUp } = useGame();
  const [attackPower, setAttackPower] = useState<number>(0);
  const [manualPower, setManualPower] = useState<number>(0);
  const [charging, setCharging] = useState<boolean>(false);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [prevLevel, setPrevLevel] = useState<number>(state.player.level);
  
  useEffect(() => {
    // Check for level up
    if (state.player.level > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(state.player.level);
      
      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
    }
  }, [state.player.level, prevLevel]);
  
  // Select a monster to battle
  const selectMonster = (monster: Monster) => {
    startBattle(monster);
    toast.info(`Battle with ${monster.name} started!`, {
      description: "Use your calories to power up attacks!"
    });
  };
  
  // Charge an attack based on calories
  const chargeAttack = () => {
    if (!manualPower || manualPower <= 0) {
      toast.error("Please enter a power value first!");
      return;
    }

    const maxCalories = state.player.calories;
    const requestedPower = Math.min(manualPower, 100);
    
    if (requestedPower > maxCalories) {
      toast.error(`Not enough calories! You only have ${maxCalories} available.`);
      return;
    }
    
    setCharging(true);
    let power = 0;
    const targetPower = requestedPower;
    
    const interval = setInterval(() => {
      power += 5;
      setAttackPower(power);
      
      if (power >= targetPower) {
        clearInterval(interval);
        setTimeout(() => {
          setCharging(false);
        }, 500);
      }
    }, 100);
  };
  
  // Generate a random attack type based on weighted probabilities
  const getRandomAttackType = () => {
    const rand = Math.random();
    if (rand < 0.15) return ATTACK_TYPES.MAX_EFFORT;
    if (rand < 0.70) return ATTACK_TYPES.NORMAL;
    if (rand < 0.90) return ATTACK_TYPES.MINIMAL;
    return ATTACK_TYPES.MISSED;
  };
  
  // Execute the attack with charged power
  const executeAttack = () => {
    if (attackPower <= 0) {
      toast.error("Charge your attack first!", {
        description: "Use your calories to power up your attack."
      });
      return;
    }
    
    // Get random attack type
    const attackType = getRandomAttackType();
    
    // Calculate damage based on attack power, player stats, and attack type
    const baseDamage = Math.floor((attackPower / 10) * state.player.attack);
    const damage = Math.floor(baseDamage * attackType.multiplier);
    
    attackMonster(damage);
    setAttackPower(0);
    setManualPower(0);
    
    toast.success(`${attackType.message} You dealt ${damage} damage!`, {
      description: state.currentMonster ? 
        `${state.currentMonster.name} has ${state.currentMonster.hp} HP left!` : 
        "The monster has been defeated!"
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="animate-float p-8 text-center rounded-lg bg-gradient-to-br from-orange to-purple">
            <h2 className="text-3xl font-bold text-white mb-2">Level Up!</h2>
            <p className="text-white text-xl">Your character is now level {state.player.level}!</p>
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={() => setShowLevelUp(false)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Enter power (1-100)"
                    min="1"
                    max="100"
                    value={manualPower || ''}
                    onChange={(e) => setManualPower(Number(e.target.value))}
                    className="flex-1"
                  />
                  <Button 
                    onClick={chargeAttack} 
                    disabled={charging || state.player.calories < 10 || !manualPower}
                    className="bg-teal hover:bg-teal/90 flex items-center justify-center whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {charging ? 'Charging...' : 'Charge'}
                  </Button>
                </div>
                
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
                <p className="mt-1">Attack types: Max Effort (+50% damage), Normal, Minimal (-40% damage), Missed (no damage)</p>
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
