import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export type Monster = {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  image: string;
  isBoss: boolean;
};

export type Player = {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  calories: number;
  avatarId: number;
};

export type GameState = {
  player: Player;
  currentMonster: Monster | null;
  monsters: Monster[];
  questsCompleted: number;
  dailyCalories: number;
  dailyGoal: number;
  streakDays: number;
  inBattle: boolean;
};

type GameAction =
  | { type: 'ADD_CALORIES'; payload: number }
  | { type: 'ATTACK_MONSTER'; payload: number }
  | { type: 'START_BATTLE'; payload: Monster }
  | { type: 'END_BATTLE' }
  | { type: 'LEVEL_UP' }
  | { type: 'COMPLETE_QUEST' }
  | { type: 'UPDATE_PLAYER'; payload: Partial<Player> };

// Initial state
const initialPlayer: Player = {
  name: 'Player',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  hp: 100,
  maxHp: 100,
  attack: 10,
  defense: 5,
  calories: 0,
  avatarId: 1,
};

const monsters: Monster[] = [
  {
    id: 'monster1',
    name: 'Flame Slime',
    level: 1,
    hp: 50,
    maxHp: 50,
    attack: 5,
    defense: 2,
    image: '/monsters/slime.png',
    isBoss: false,
  },
  {
    id: 'monster2',
    name: 'Shadow Bat',
    level: 2,
    hp: 75,
    maxHp: 75,
    attack: 8,
    defense: 3,
    image: '/monsters/bat.png',
    isBoss: false,
  },
  {
    id: 'boss1',
    name: 'Inferno Dragon',
    level: 5,
    hp: 200,
    maxHp: 200,
    attack: 15,
    defense: 10,
    image: '/monsters/dragon.png',
    isBoss: true,
  },
];

const initialState: GameState = {
  player: initialPlayer,
  currentMonster: null,
  monsters: monsters,
  questsCompleted: 0,
  dailyCalories: 0,
  dailyGoal: 500,
  streakDays: 0,
  inBattle: false,
};

// Reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'ADD_CALORIES': {
      const calories = action.payload;
      const newTotalCalories = state.player.calories + calories;
      const newDailyCalories = state.dailyCalories + calories;
      
      // XP is calculated as calories * 2
      const xpGained = calories * 2;
      let newXp = state.player.xp + xpGained;
      let newLevel = state.player.level;
      let newXpToNextLevel = state.player.xpToNextLevel;
      
      // Check for level up
      if (newXp >= state.player.xpToNextLevel) {
        newXp = newXp - state.player.xpToNextLevel;
        newLevel += 1;
        newXpToNextLevel = Math.floor(state.player.xpToNextLevel * 1.5);
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          calories: newTotalCalories,
          xp: newXp,
          level: newLevel,
          xpToNextLevel: newXpToNextLevel,
          attack: initialPlayer.attack + (newLevel - 1) * 2,
          defense: initialPlayer.defense + (newLevel - 1),
          maxHp: initialPlayer.maxHp + (newLevel - 1) * 10,
          hp: initialPlayer.maxHp + (newLevel - 1) * 10,
        },
        dailyCalories: newDailyCalories,
      };
    }
    
    case 'ATTACK_MONSTER': {
      if (!state.currentMonster || !state.inBattle) return state;
      
      const damage = action.payload;
      const monsterHp = Math.max(0, state.currentMonster.hp - damage);
      
      if (monsterHp === 0) {
        // Monster defeated
        return {
          ...state,
          currentMonster: null,
          inBattle: false,
          player: {
            ...state.player,
            xp: state.player.xp + (state.currentMonster.level * 20),
          },
          questsCompleted: state.currentMonster.isBoss 
            ? state.questsCompleted + 1 
            : state.questsCompleted,
        };
      }
      
      return {
        ...state,
        currentMonster: {
          ...state.currentMonster,
          hp: monsterHp,
        },
      };
    }
    
    case 'START_BATTLE':
      return {
        ...state,
        currentMonster: {...action.payload},
        inBattle: true,
      };
      
    case 'END_BATTLE':
      return {
        ...state,
        currentMonster: null,
        inBattle: false,
      };
      
    case 'LEVEL_UP':
      return {
        ...state,
        player: {
          ...state.player,
          level: state.player.level + 1,
          attack: state.player.attack + 2,
          defense: state.player.defense + 1,
          maxHp: state.player.maxHp + 10,
          hp: state.player.maxHp + 10,
          xp: 0,
          xpToNextLevel: Math.floor(state.player.xpToNextLevel * 1.5),
        },
      };
      
    case 'COMPLETE_QUEST':
      return {
        ...state,
        questsCompleted: state.questsCompleted + 1,
      };
      
    case 'UPDATE_PLAYER':
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload,
        },
      };
      
    default:
      return state;
  }
};

// Context
type GameContextType = {
  state: GameState;
  addCalories: (calories: number) => void;
  attackMonster: (damage: number) => void;
  startBattle: (monster: Monster) => void;
  endBattle: () => void;
  updatePlayer: (playerData: Partial<Player>) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('monsterBurnerState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // We need to manually dispatch actions to rebuild state properly
        if (parsedState.player) {
          dispatch({ type: 'UPDATE_PLAYER', payload: parsedState.player });
        }
        // Other state restoring logic could go here
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }, []);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('monsterBurnerState', JSON.stringify({
      player: state.player,
      questsCompleted: state.questsCompleted,
      streakDays: state.streakDays,
    }));
  }, [state]);
  
  // Context value
  const value = {
    state,
    addCalories: (calories: number) => {
      dispatch({ type: 'ADD_CALORIES', payload: calories });
    },
    attackMonster: (damage: number) => {
      dispatch({ type: 'ATTACK_MONSTER', payload: damage });
    },
    startBattle: (monster: Monster) => {
      dispatch({ type: 'START_BATTLE', payload: monster });
    },
    endBattle: () => {
      dispatch({ type: 'END_BATTLE' });
    },
    updatePlayer: (playerData: Partial<Player>) => {
      dispatch({ type: 'UPDATE_PLAYER', payload: playerData });
    },
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Hook
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
