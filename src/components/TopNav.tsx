import { Menu, User } from 'lucide-react';

export function TopNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-4">
        <button className="text-primary hover:opacity-70 transition-opacity active:scale-95 duration-200">
          <Menu size={24} />
        </button>
      </div>
      <div className="font-headline tracking-[0.2em] text-lg font-bold text-primary uppercase">
        LUMINOUS
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-white/50 flex items-center justify-center text-primary">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
