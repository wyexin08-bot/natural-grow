import { Home, Camera, Palette, Shirt } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'camera', icon: Camera, label: 'Analyze' },
    { id: 'results', icon: Palette, label: 'Palette' },
    { id: 'wardrobe', icon: Shirt, label: 'Wardrobe' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-white/60 backdrop-blur-2xl rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(102,88,129,0.06)] border-t border-white/20">
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = currentView === id;
        return (
          <button
            key={id}
            onClick={() => onViewChange(id as ViewState)}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-300 active:scale-90 ${
              isActive
                ? 'text-primary bg-primary/10 rounded-2xl'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <Icon size={24} className="mb-1" strokeWidth={isActive ? 2.5 : 2} />
            <span className="font-headline text-[10px] font-medium tracking-wide">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
