import { 
  Package, 
  Hammer, 
  Layers, 
  Zap, 
  Droplets, 
  Wind, 
  Lightbulb, 
  DoorOpen, 
  Palette, 
  Settings, 
  Wrench,
  Box
} from 'lucide-react';

const CategoryIcon = ({ category = 'default', className = 'w-6 h-6' }) => {
  const iconMap = {
    cement: Layers,
    bricks: Layers,
    steel: Hammer,
    electrical: Zap,
    plumbing: Droplets,
    hvac: Wind,
    lighting: Lightbulb,
    doors: DoorOpen,
    paint: Palette,
    hardware: Settings,
    equipment: Wrench,
    other: Box,
    default: Package
  };

  const Icon = iconMap[category?.toLowerCase()] || iconMap.default;
  
  return <Icon className={className} />;
};

export default CategoryIcon;
