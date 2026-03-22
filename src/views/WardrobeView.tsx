import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Sparkles, Shirt, Info } from 'lucide-react';
import { ColorType, WardrobeItem } from '../types';

interface WardrobeViewProps {
  colorType: ColorType | null;
  wardrobe: WardrobeItem[];
  onAddItem: (item: WardrobeItem) => void;
}

export function WardrobeView({ colorType, wardrobe, onAddItem }: WardrobeViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'suggestions'>('all');
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newItem: WardrobeItem = {
        id: Date.now().toString(),
        imageUrl: 'https://images.unsplash.com/photo-1434389678278-be4d41a6b8e5?auto=format&fit=crop&q=80&w=400',
        category: 'top',
        color: 'White/Cream'
      };
      onAddItem(newItem);
      setIsUploading(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-32 px-6 max-w-screen-xl mx-auto min-h-screen"
    >
      <header className="mb-10">
        <h1 className="font-headline text-4xl font-light tracking-tight text-on-surface mb-2">
          Digital <span className="font-semibold text-primary">Wardrobe</span>
        </h1>
        {colorType ? (
          <p className="text-sm text-on-surface-variant flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            Optimized for <span className="font-medium text-primary">{colorType}</span>
          </p>
        ) : (
          <p className="text-sm text-on-surface-variant flex items-center gap-2">
            <Info size={14} />
            Complete color test for personalized suggestions
          </p>
        )}
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-outline-variant/20 pb-4">
        <button 
          onClick={() => setActiveTab('all')}
          className={`text-sm font-medium transition-colors ${activeTab === 'all' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          My Closet ({wardrobe.length})
        </button>
        <button 
          onClick={() => setActiveTab('suggestions')}
          className={`text-sm font-medium transition-colors flex items-center gap-1 ${activeTab === 'suggestions' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Sparkles size={14} /> AI Styling
        </button>
      </div>

      {activeTab === 'all' ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Upload Button */}
            <button 
              onClick={handleSimulateUpload}
              disabled={isUploading}
              className="aspect-[3/4] rounded-2xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors bg-surface-container-lowest"
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2" />
              ) : (
                <Plus size={32} className="mb-2" />
              )}
              <span className="text-xs font-medium uppercase tracking-wider">
                {isUploading ? 'Analyzing...' : 'Add Item'}
              </span>
            </button>

            {/* Wardrobe Items */}
            {wardrobe.map((item) => (
              <div key={item.id} className="aspect-[3/4] rounded-2xl overflow-hidden luminous-card group relative">
                <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs font-medium capitalize">{item.category}</p>
                  <p className="text-white/80 text-[10px]">{item.color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {!colorType ? (
            <div className="text-center py-12 bg-surface-container-low rounded-3xl">
              <Shirt size={48} className="mx-auto text-on-surface-variant/50 mb-4" />
              <h3 className="font-headline text-xl mb-2">Unlock AI Styling</h3>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto mb-6">
                Discover your personal color type to get tailored outfit combinations from your closet.
              </p>
            </div>
          ) : wardrobe.length < 2 ? (
            <div className="text-center py-12 bg-surface-container-low rounded-3xl">
              <Plus size={48} className="mx-auto text-on-surface-variant/50 mb-4" />
              <h3 className="font-headline text-xl mb-2">Add More Items</h3>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto mb-6">
                Upload at least 2 items (e.g., a top and a bottom) to generate outfit suggestions.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-primary" size={20} />
                  <h3 className="font-headline font-semibold text-lg">Weekend Casual</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                  {wardrobe.slice(0, 2).map(item => (
                    <div key={item.id} className="w-32 shrink-0 aspect-[3/4] rounded-xl overflow-hidden">
                      <img src={item.imageUrl} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-48 shrink-0 bg-surface-container-low rounded-xl p-4 flex flex-col justify-center">
                    <p className="text-xs text-on-surface-variant mb-2 font-medium uppercase tracking-wider">Stylist Note</p>
                    <p className="text-sm">These pieces perfectly complement your {colorType} undertones. The contrast level is ideal for daytime wear.</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/20 p-6 rounded-3xl border border-primary/10">
                <h3 className="font-headline font-semibold text-lg mb-2">Future Purchase Suggestions</h3>
                <p className="text-sm text-on-surface-variant mb-4">Based on your current closet and {colorType} profile, consider adding:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm bg-white/50 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-[#D7E3FC] shrink-0" />
                    <span>A pale blue silk blouse to pair with your existing bottoms.</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm bg-white/50 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-[#E6DFF1] shrink-0" />
                    <span>Lavender accessories (scarf or bag) to elevate neutral outfits.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
