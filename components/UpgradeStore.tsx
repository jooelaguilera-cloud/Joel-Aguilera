import React from 'react';
import { GameState, Upgrade } from '../types';
import { Button } from './Button';
import { ArrowUpCircle } from 'lucide-react';

interface UpgradeStoreProps {
  state: GameState;
  onUpgrade: (upgradeId: string) => void;
  onBack: () => void;
}

export const UpgradeStore: React.FC<UpgradeStoreProps> = ({ state, onUpgrade, onBack }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <h2 className="text-3xl font-black text-purple-800 mb-6 text-center">Mejoras del Taller</h2>

      <div className="grid grid-cols-1 gap-4">
        {state.upgrades.map(upgrade => {
          const nextCost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level));
          const isMaxed = upgrade.level >= upgrade.maxLevel;
          const canAfford = state.money >= nextCost;

          return (
            <div key={upgrade.id} className="bg-white p-4 rounded-3xl border-4 border-purple-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="text-4xl bg-purple-100 w-16 h-16 flex items-center justify-center rounded-2xl">
                        {upgrade.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{upgrade.name}</h3>
                        <p className="text-sm text-gray-500">{upgrade.description}</p>
                        <div className="flex gap-1 mt-1">
                            {Array.from({length: upgrade.maxLevel}).map((_, i) => (
                                <div key={i} className={`h-2 w-8 rounded-full ${i < upgrade.level ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    {!isMaxed ? (
                        <Button 
                            size="sm"
                            variant={canAfford ? 'primary' : 'neutral'}
                            onClick={() => onUpgrade(upgrade.id)}
                            disabled={!canAfford}
                            icon={<ArrowUpCircle size={18} />}
                        >
                            ${nextCost}
                        </Button>
                    ) : (
                        <span className="text-green-600 font-black px-4 py-2 bg-green-100 rounded-xl">
                            MAX
                        </span>
                    )}
                </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Button variant="secondary" onClick={onBack}>Volver al Taller</Button>
      </div>
    </div>
  );
};