import React from 'react';
import { Car, Upgrade } from '../types';
import { calculateSellPrice } from '../services/gameLogic';
import { Button } from './Button';
import { CarVisual } from './CarVisual';
import { DollarSign, Trash2 } from 'lucide-react';

interface ShowroomProps {
  inventory: Car[];
  upgrades: Upgrade[];
  onSell: (car: Car, price: number) => void;
  onBack: () => void;
}

export const Showroom: React.FC<ShowroomProps> = ({ inventory, upgrades, onSell, onBack }) => {
  const repairedCars = inventory.filter(c => c.isRepaired);
  
  // Calculate total multiplier from upgrades
  const profitMultiplier = upgrades.reduce((acc, curr) => acc * (1 + (curr.level * 0.1)), 1);

  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <h2 className="text-3xl font-black text-green-700 mb-6 text-center">Vender Autos</h2>

      {repairedCars.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-3xl">
            <p className="text-2xl text-gray-500 font-bold mb-4">¡No tienes autos reparados!</p>
            <Button onClick={onBack}>Volver al Taller</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repairedCars.map(car => {
            const sellPrice = calculateSellPrice(car, profitMultiplier);
            const profit = sellPrice - car.purchasePrice;
            
            return (
              <div key={car.id} className="bg-white p-6 rounded-3xl border-4 border-green-200 flex flex-col items-center shadow-lg animate-pop">
                <div className="mb-4 scale-75">
                    <CarVisual car={car} size="sm" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
                <div className="text-gray-500 text-sm mb-4">Comprado por: ${car.purchasePrice}</div>
                
                <div className="flex flex-col w-full gap-2">
                    <div className="flex justify-between bg-green-50 p-3 rounded-xl border border-green-100">
                        <span className="font-bold text-green-800">Ganancia:</span>
                        <span className="font-bold text-green-600">+{profit}</span>
                    </div>
                    
                    <Button 
                        variant="success" 
                        size="lg"
                        className="w-full"
                        onClick={() => onSell(car, sellPrice)}
                        icon={<DollarSign />}
                    >
                        Vender por ${sellPrice}
                    </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};