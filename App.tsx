import React, { useState, useEffect } from 'react';
import { GameState, ViewState, Car } from './types';
import { INITIAL_MONEY, INITIAL_UPGRADES } from './constants';
import { Header } from './components/Header';
import { CarMarket } from './components/CarMarket';
import { Workshop } from './components/Workshop';
import { Showroom } from './components/Showroom';
import { UpgradeStore } from './components/UpgradeStore';
import { Button } from './components/Button';
import { CarVisual } from './components/CarVisual';
import { Wrench, ShoppingBag, Store, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MENU');
  
  const [gameState, setGameState] = useState<GameState>({
    money: INITIAL_MONEY,
    xp: 0,
    level: 1,
    inventory: [],
    workshopCapacity: 2,
    upgrades: INITIAL_UPGRADES,
    stats: { carsSold: 0, totalEarned: 0 }
  });

  const [activeCarId, setActiveCarId] = useState<string | null>(null);

  // --- Handlers ---

  const handleBuyCar = (car: Car) => {
    if (gameState.money >= car.purchasePrice) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - car.purchasePrice,
        inventory: [...prev.inventory, car]
      }));
      setView('WORKSHOP'); // Go straight to workshop or menu? Let's go menu
      setActiveCarId(null);
    }
  };

  const handleRepairComplete = (repairedCar: Car) => {
    setGameState(prev => ({
      ...prev,
      inventory: prev.inventory.map(c => c.id === repairedCar.id ? repairedCar : c),
      xp: prev.xp + 20
    }));
    // Check level up
    if (gameState.xp > gameState.level * 100) {
        setGameState(prev => ({ ...prev, level: prev.level + 1 }));
    }
    setActiveCarId(null); // Return to list
  };

  const handleSellCar = (car: Car, price: number) => {
    setGameState(prev => ({
      ...prev,
      money: prev.money + price,
      inventory: prev.inventory.filter(c => c.id !== car.id),
      stats: {
        carsSold: prev.stats.carsSold + 1,
        totalEarned: prev.stats.totalEarned + price
      }
    }));
    // Add XP
    setGameState(prev => ({ ...prev, xp: prev.xp + 50 }));
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const cost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level));
    
    if (gameState.money >= cost && upgrade.level < upgrade.maxLevel) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - cost,
        upgrades: prev.upgrades.map(u => 
          u.id === upgradeId ? { ...u, level: u.level + 1 } : u
        )
      }));
    }
  };

  // --- Views ---

  const renderMainMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 px-4 space-y-8">
      
      {/* Workshop Floor */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Active Repair Bay */}
        <div className="bg-white rounded-3xl p-6 border-b-8 border-gray-200 shadow-xl min-h-[300px] flex flex-col">
          <h2 className="text-2xl font-black text-gray-700 mb-4 flex items-center gap-2">
            <Wrench className="text-blue-500" /> Taller
          </h2>
          
          <div className="flex-1 flex flex-col gap-4">
             {gameState.inventory.filter(c => !c.isRepaired).length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 border-4 border-dashed border-gray-200 rounded-2xl">
                    <p className="font-bold text-lg">Vacío</p>
                    <p className="text-sm">¡Compra autos!</p>
                </div>
             ) : (
                gameState.inventory.filter(c => !c.isRepaired).map(car => (
                    <div key={car.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-xl border-2 border-blue-100">
                        <div className="scale-50 -ml-8 w-20">
                            <CarVisual car={car} size="sm" />
                        </div>
                        <div className="flex-1 ml-4">
                             <div className="font-bold text-gray-700">{car.name}</div>
                             <div className="text-xs text-red-400 font-bold">{car.damages.filter(d=>!d.isFixed).length} averías</div>
                        </div>
                        <Button size="sm" onClick={() => { setActiveCarId(car.id); setView('WORKSHOP'); }}>
                            Reparar
                        </Button>
                    </div>
                ))
             )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4">
            <Button 
                variant="primary" 
                size="xl" 
                onClick={() => setView('MARKET')}
                icon={<ShoppingBag size={32} />}
                className="h-32 text-left pl-8 relative overflow-hidden group"
            >
                <div className="z-10 relative">
                    <div className="text-3xl">Comprar Autos</div>
                    <div className="text-sm text-blue-200 font-normal">Encuentra ofertas</div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform">
                     <ShoppingBag size={120} />
                </div>
            </Button>

            <Button 
                variant="success" 
                size="xl" 
                onClick={() => setView('SHOWROOM')}
                icon={<Store size={32} />}
                className="h-32 text-left pl-8 relative overflow-hidden group"
            >
                 <div className="z-10 relative">
                    <div className="text-3xl">Vender</div>
                    <div className="text-sm text-green-200 font-normal">
                        {gameState.inventory.filter(c => c.isRepaired).length} autos listos
                    </div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform">
                     <Store size={120} />
                </div>
            </Button>

             <Button 
                variant="secondary" 
                size="xl" 
                onClick={() => setView('UPGRADES')}
                icon={<TrendingUp size={32} />}
                className="h-32 text-left pl-8 relative overflow-hidden group"
            >
                 <div className="z-10 relative">
                    <div className="text-3xl">Mejorar</div>
                    <div className="text-sm text-purple-200 font-normal">Expande tu imperio</div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform">
                     <TrendingUp size={120} />
                </div>
            </Button>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 selection:bg-none">
      <Header state={gameState} onHome={() => { setView('MENU'); setActiveCarId(null); }} />
      
      <main className="pt-20">
        {view === 'MENU' && renderMainMenu()}
        
        {view === 'MARKET' && (
          <CarMarket 
            money={gameState.money} 
            level={gameState.level} 
            onBuy={handleBuyCar} 
            onBack={() => setView('MENU')}
          />
        )}
        
        {view === 'WORKSHOP' && activeCarId && (
          <Workshop 
            car={gameState.inventory.find(c => c.id === activeCarId)!} 
            onComplete={handleRepairComplete} 
          />
        )}

        {view === 'SHOWROOM' && (
          <Showroom 
            inventory={gameState.inventory} 
            upgrades={gameState.upgrades} 
            onSell={handleSellCar} 
            onBack={() => setView('MENU')} 
          />
        )}

        {view === 'UPGRADES' && (
            <UpgradeStore 
                state={gameState} 
                onUpgrade={handleBuyUpgrade} 
                onBack={() => setView('MENU')}
            />
        )}
      </main>
    </div>
  );
};

export default App;