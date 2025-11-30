export enum CarType {
  SEDAN = 'SEDAN',
  TRUCK = 'TRUCK',
  RACE = 'RACE',
  VAN = 'VAN'
}

export enum ToolType {
  WRENCH = 'WRENCH',
  HAMMER = 'HAMMER',
  PUMP = 'PUMP',
  PAINT = 'PAINT'
}

export interface Damage {
  id: string;
  type: ToolType;
  x: number; // Percentage position 0-100
  y: number; // Percentage position 0-100
  isFixed: boolean;
}

export interface Car {
  id: string;
  name: string;
  type: CarType;
  color: string;
  purchasePrice: number;
  baseSellPrice: number;
  damages: Damage[];
  isRepaired: boolean;
  imageSeed: number; // To generate consistent random look
}

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  level: number;
  maxLevel: number;
  description: string;
  icon: string;
  multiplier: number; // Profit multiplier
}

export interface GameState {
  money: number;
  xp: number;
  level: number;
  inventory: Car[];
  workshopCapacity: number;
  upgrades: Upgrade[];
  stats: {
    carsSold: number;
    totalEarned: number;
  }
}

export type ViewState = 'MENU' | 'MARKET' | 'WORKSHOP' | 'SHOWROOM' | 'UPGRADES';