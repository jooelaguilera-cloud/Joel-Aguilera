import React, { useState, useEffect } from 'react';
import { Car, Damage, ToolType } from '../types';
import { TOOL_CONFIG } from '../constants';
import { CarVisual } from './CarVisual';
import { Button } from './Button';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface WorkshopProps {
  car: Car;
  onComplete: (repairedCar: Car) => void;
}

export const Workshop: React.FC<WorkshopProps> = ({ car, onComplete }) => {
  const [currentCar, setCurrentCar] = useState<Car>(car);
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Check if fully repaired
    const isFixed = currentCar.damages.every(d => d.isFixed);
    if (isFixed && !currentCar.isRepaired) {
      setCurrentCar(prev => ({ ...prev, isRepaired: true }));
      setShowCelebration(true);
      setTimeout(() => {
        onComplete({ ...currentCar, isRepaired: true });
      }, 2000);
    }
  }, [currentCar, onComplete]);

  const handleFixDamage = (damage: Damage) => {
    if (selectedTool === damage.type && !damage.isFixed) {
      // Play sound effect (simulated)
      
      const newDamages = currentCar.damages.map(d => 
        d.id === damage.id ? { ...d, isFixed: true } : d
      );
      setCurrentCar(prev => ({ ...prev, damages: newDamages }));
    } else {
        // Wrong tool animation shake
    }
  };

  const getDamageIcon = (type: ToolType) => {
    switch(type) {
        case ToolType.WRENCH: return "⚙️";
        case ToolType.HAMMER: return "🤕";
        case ToolType.PUMP: return "💨";
        case ToolType.PAINT: return "🎨";
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-black text-blue-800">Taller de Reparación</h2>
        <p className="text-blue-600">¡Selecciona una herramienta y toca las averías!</p>
      </div>

      {/* Main Work Area */}
      <div className="flex-1 relative bg-white rounded-3xl border-4 border-gray-200 shadow-inner flex items-center justify-center overflow-hidden min-h-[300px]">
        {showCelebration && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm animate-pop">
                <div className="text-center">
                    <Sparkles className="w-20 h-20 text-yellow-500 mx-auto animate-spin" />
                    <h1 className="text-5xl font-black text-green-600 drop-shadow-lg">¡Excelente!</h1>
                </div>
            </div>
        )}
        
        <div className="relative scale-150">
           <CarVisual car={currentCar} size="lg" />
           
           {/* Damage Spots overlay */}
           {!showCelebration && currentCar.damages.map((damage) => (
             !damage.isFixed && (
               <button
                 key={damage.id}
                 onClick={() => handleFixDamage(damage)}
                 className={`absolute w-12 h-12 flex items-center justify-center text-2xl bg-white border-2 border-red-500 rounded-full shadow-lg animate-pulse hover:scale-110 active:scale-90 transition-transform z-20`}
                 style={{ 
                   left: `${damage.x}%`, 
                   top: `${damage.y}%`,
                   cursor: selectedTool === damage.type ? 'crosshair' : 'not-allowed'
                 }}
               >
                 {getDamageIcon(damage.type)}
               </button>
             )
           ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {Object.entries(TOOL_CONFIG).map(([key, config]) => {
          const type = key as ToolType;
          const isSelected = selectedTool === type;
          const Icon = config.icon;
          
          return (
            <button
              key={key}
              onClick={() => setSelectedTool(type)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-b-4 transition-all ${
                isSelected 
                  ? 'bg-yellow-100 border-yellow-500 -translate-y-2' 
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon size={40} className={config.color} />
              <span className={`font-bold mt-2 ${isSelected ? 'text-black' : 'text-gray-500'}`}>
                {config.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};