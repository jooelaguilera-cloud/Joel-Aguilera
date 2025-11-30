import { CarType, ToolType, Upgrade } from './types';
import { Wrench, Hammer, Wind, PaintBucket } from 'lucide-react';

export const INITIAL_MONEY = 500;

export const CAR_NAMES = [
  "Rayo Azul", "Tortuga Veloz", "Bestia Roja", "Camioneta Feliz", 
  "Turbo Gato", "Cohete", "Burbuja", "Trueno"
];

export const CAR_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'
];

export const TOOL_CONFIG = {
  [ToolType.WRENCH]: { icon: Wrench, color: 'text-gray-600', label: 'Ajustar' },
  [ToolType.HAMMER]: { icon: Hammer, color: 'text-orange-700', label: 'Enderezar' },
  [ToolType.PUMP]: { icon: Wind, color: 'text-blue-400', label: 'Inflar' },
  [ToolType.PAINT]: { icon: PaintBucket, color: 'text-purple-500', label: 'Pintar' },
};

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'decor',
    name: 'Decoración',
    cost: 300,
    level: 1,
    maxLevel: 5,
    description: 'Mejora la apariencia del taller para atraer clientes ricos.',
    icon: '✨',
    multiplier: 1.1
  },
  {
    id: 'tools',
    name: 'Herramientas Pro',
    cost: 500,
    level: 1,
    maxLevel: 3,
    description: 'Herramientas doradas que aumentan el valor del auto.',
    icon: '🔧',
    multiplier: 1.2
  },
  {
    id: 'helpers',
    name: 'Ayudantes Robots',
    cost: 1000,
    level: 0,
    maxLevel: 3,
    description: 'Robots simpáticos que ayudan en el taller.',
    icon: '🤖',
    multiplier: 1.5
  }
];