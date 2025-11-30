import { Car, CarType, Damage, ToolType } from '../types';
import { CAR_NAMES, CAR_COLORS } from '../constants';

export const generateId = () => Math.random().toString(36).substr(2, 9);

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateDamages = (difficulty: number): Damage[] => {
  const numDamages = Math.floor(Math.random() * 2) + 1 + difficulty; // 1 to 3+ damages
  const damages: Damage[] = [];
  
  for (let i = 0; i < numDamages; i++) {
    damages.push({
      id: generateId(),
      type: getRandomItem([ToolType.WRENCH, ToolType.HAMMER, ToolType.PUMP, ToolType.PAINT]),
      x: 20 + Math.random() * 60, // Keep within central 60%
      y: 30 + Math.random() * 40,
      isFixed: false
    });
  }
  return damages;
};

export const generateRandomCar = (playerLevel: number): Car => {
  const type = getRandomItem([CarType.SEDAN, CarType.TRUCK, CarType.RACE, CarType.VAN]);
  const basePrice = 100 + (playerLevel * 50) + (Math.random() * 100);
  
  return {
    id: generateId(),
    name: getRandomItem(CAR_NAMES),
    type: type,
    color: getRandomItem(CAR_COLORS),
    purchasePrice: Math.floor(basePrice),
    baseSellPrice: Math.floor(basePrice * 1.5), // 50% profit margin potential
    damages: generateDamages(Math.floor(playerLevel / 2)),
    isRepaired: false,
    imageSeed: Math.floor(Math.random() * 1000)
  };
};

export const calculateSellPrice = (car: Car, upgradesMultiplier: number): number => {
  if (!car.isRepaired) return Math.floor(car.purchasePrice * 0.5); // Loss if sold broken
  return Math.floor(car.baseSellPrice * upgradesMultiplier);
};