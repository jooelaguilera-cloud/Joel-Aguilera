import React from 'react';
import { Car, CarType } from '../types';

interface CarVisualProps {
  car: Car;
  size?: 'sm' | 'lg';
  showDamage?: boolean;
}

export const CarVisual: React.FC<CarVisualProps> = ({ car, size = 'lg', showDamage = false }) => {
  const scale = size === 'sm' ? 'scale-50' : 'scale-100';
  
  // Base shape based on type
  const getCarShape = () => {
    switch (car.type) {
        case CarType.TRUCK:
            return (
                <div className="relative w-64 h-32">
                     {/* Cabin */}
                    <div className={`absolute left-0 bottom-4 w-24 h-24 rounded-t-lg rounded-bl-lg ${car.color} border-4 border-black z-10`}></div>
                    {/* Bed */}
                    <div className={`absolute left-20 bottom-4 w-40 h-16 rounded-tr-lg rounded-br-lg bg-gray-300 border-4 border-black`}></div>
                     {/* Window */}
                    <div className="absolute left-4 bottom-16 w-16 h-10 bg-blue-200 border-2 border-blue-400 rounded-sm z-20"></div>
                </div>
            );
        case CarType.RACE:
             return (
                <div className="relative w-64 h-24 mt-8">
                    {/* Spoiler */}
                    <div className="absolute left-0 top-0 w-4 h-12 bg-black"></div>
                    <div className="absolute left-0 top-0 w-16 h-4 bg-black"></div>
                    {/* Body */}
                    <div className={`absolute left-4 bottom-4 w-56 h-16 rounded-t-full rounded-b-lg ${car.color} border-4 border-black transform skew-x-[-20deg]`}></div>
                    {/* Stripe */}
                    <div className="absolute left-4 bottom-10 w-56 h-4 bg-white opacity-50 transform skew-x-[-20deg]"></div>
                </div>
            );
        case CarType.VAN:
            return (
                <div className="relative w-60 h-40">
                    <div className={`absolute left-0 bottom-4 w-60 h-32 rounded-3xl ${car.color} border-4 border-black`}></div>
                    <div className="absolute left-5 bottom-16 w-24 h-12 bg-blue-200 border-2 border-blue-400 rounded-lg"></div>
                    <div className="absolute right-5 bottom-16 w-24 h-12 bg-blue-200 border-2 border-blue-400 rounded-lg"></div>
                </div>
            );
        default: // Sedan
            return (
                <div className="relative w-64 h-32">
                    <div className={`absolute left-0 bottom-4 w-64 h-20 rounded-2xl ${car.color} border-4 border-black`}></div>
                    <div className={`absolute left-10 bottom-20 w-44 h-12 rounded-t-3xl ${car.color} border-4 border-black`}></div>
                    <div className="absolute left-14 bottom-18 w-16 h-8 bg-blue-200 rounded-t-xl border-2 border-blue-400"></div>
                    <div className="absolute right-14 bottom-18 w-16 h-8 bg-blue-200 rounded-t-xl border-2 border-blue-400"></div>
                </div>
            );
    }
  };

  return (
    <div className={`relative ${scale} transform-gpu transition-transform`}>
      {getCarShape()}
      {/* Wheels */}
      <div className="absolute bottom-0 left-8 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-400 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute bottom-0 right-8 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-400 animate-bounce" style={{ animationDuration: '3.1s' }}>
        <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Face/Headlights */}
      <div className="absolute bottom-12 right-2 w-4 h-6 bg-yellow-200 rounded-full border-2 border-yellow-500 animate-pulse"></div>
    </div>
  );
};