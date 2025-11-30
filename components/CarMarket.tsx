import React, { useState, useEffect } from 'react';
import { generateRandomCar } from '../services/gameLogic';
import { Car } from '../types';
import { Button } from './Button';
import { CarVisual } from './CarVisual';
import { ShoppingCart, RefreshCcw } from 'lucide-react';

interface CarMarketProps {
  money: number;
  level: number;
  onBuy: (car: Car) => void;
  onBack: () => void;
}

export const CarMarket: React.FC<CarMarketProps> = ({ money, level, onBuy, onBack }) => {
  const [carsForSale, setCarsForSale] = useState<Car[]>([]);

  useEffect(() => {
    // Generate 3 random cars
    const newCars = Array(3).fill(null).map(() => generateRandomCar(level));
    setCarsForSale(newCars);
  }, [level]);

  const refreshMarket = () => {
     const newCars = Array(3).fill(null).map(() => generateRandomCar(level));
     setCarsForSale(newCars);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-blue-800">Concesionario de Usados</h2>
        <Button size="sm" variant="secondary" onClick={refreshMarket} icon={<RefreshCcw size={16}/>}>
            Nuevos Autos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carsForSale.map(car => (
          <div key={car.id} className="bg-white p-6 rounded-3xl border-4 border-gray-200 flex flex-col items-center shadow-lg relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="mb-4 scale-75 group-hover:scale-90 transition-transform duration-300">
                <CarVisual car={car} size="sm" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h3>
            
            <div className="flex gap-2 mb-4">
                {car.damages.map((_, i) => (
                    <span key={i} className="w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Avería"></span>
                ))}
            </div>

            <div className="mt-auto w-full">
                <Button 
                    variant={money >= car.purchasePrice ? "success" : "neutral"}
                    className="w-full"
                    onClick={() => onBuy(car)}
                    disabled={money < car.purchasePrice}
                    icon={<ShoppingCart size={20} />}
                >
                    ${car.purchasePrice}
                </Button>
            </div>
            
            {money < car.purchasePrice && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center pointer-events-none">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold rotate-12 transform">Muy caro</span>
                </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="danger" onClick={onBack}>Volver al Taller</Button>
      </div>
    </div>
  );
};