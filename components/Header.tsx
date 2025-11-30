import React from 'react';
import { Coins, Star, Trophy } from 'lucide-react';
import { GameState } from '../types';

interface HeaderProps {
  state: GameState;
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ state, onHome }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm border-b-4 border-blue-200 p-2 z-50 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <button onClick={onHome} className="bg-yellow-400 hover:bg-yellow-300 p-2 rounded-xl border-b-4 border-yellow-600 transition-transform active:scale-95">
          🏠 Inicio
        </button>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full border-2 border-green-400">
            <Coins className="text-yellow-500 fill-yellow-500" />
            <span className="font-black text-green-800 text-xl">${state.money}</span>
          </div>

          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full border-2 border-purple-400">
             <Star className="text-purple-500 fill-purple-500" />
             <span className="font-bold text-purple-800">Nivel {state.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};