
import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';

const CalorieInput: React.FC = () => {
  const [calories, setCalories] = useState<string>('');
  const { addCalories } = useGame();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const calorieAmount = parseInt(calories);
    if (isNaN(calorieAmount) || calorieAmount <= 0) {
      toast.error('Please enter a valid calorie amount', { 
        description: 'The number of calories must be greater than zero.' 
      });
      return;
    }
    
    addCalories(calorieAmount);
    toast.success(`Added ${calorieAmount} calories!`, {
      description: 'You gained XP and power for your battles!'
    });
    setCalories('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="neo-card-small">
      <h3 className="font-bold mb-3 flex items-center text-orange">
        <Flame className="w-5 h-5 mr-2" />
        Log Your Workout
      </h3>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories burned"
            className="pr-12"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            cal
          </div>
        </div>
        
        <Button type="submit" className="bg-orange hover:bg-orange/90">
          Add
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Enter the calories you burned during your workout to gain XP and power!
      </p>
    </form>
  );
};

export default CalorieInput;
