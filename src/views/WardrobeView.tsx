import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Sparkles, Shirt, Info, Upload, X, Check } from 'lucide-react';
import { ColorType, WardrobeItem } from '../types';

interface WardrobeViewProps {
  colorType: ColorType | null;
  wardrobe: WardrobeItem[];
  onAddItem: (item: WardrobeItem) => void;
}

export function WardrobeView({ colorType, wardrobe, onAddItem }: WardrobeViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'suggestions'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WardrobeItem['category']>('top');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        // Simulate AI background removal delay
        setTimeout(() => {
          setPendingImage(event.target?.result as string);
          setIsUploading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAdd = () => {
    if (pendingImage) {
      const newItem: WardrobeItem = {
        id: Date.now().toString(),
        imageUrl: pendingImage, // In a real app, this would be the processed (background removed) image URL
        category: selectedCategory,
        color: 'Analyzed Color' // In a real app, AI would detect this
      };
      onAddItem(newItem);
      setPendingImage(null);
    }
  };

  const categories: { value: WardrobeItem['category'], label: string }[] = [
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'dress', label: 'Dress' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'accessory', label: 'Accessory' },
  ];

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
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || !!pendingImage}
              className="aspect-[3/4] rounded-2xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors bg-surface-container-lowest relative overflow-hidden"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2" />
                  <span className="text-xs font-medium uppercase tracking-wider">Removing BG...</span>
                </>
              ) : (
                <>
                  <Upload size={32} className="mb-2" />
                  <span className="text-xs font-medium uppercase tracking-wider">Upload Photo</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </button>

            {/* Wardrobe Items */}
            {wardrobe.map((item) => (
              <div key={item.id} className="aspect-[3/4] rounded-2xl overflow-hidden luminous-card group relative bg-surface-container-low flex items-center justify-center">
                {/* Simulated transparent background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#665881 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                <img src={item.imageUrl} alt={item.category} className="w-full h-full object-contain p-2 relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl" />
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent z-20">
                  <p className="text-white text-xs font-medium capitalize">{item.category}</p>
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
                    <div key={item.id} className="w-32 shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low relative flex items-center justify-center">
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#665881 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                      <img src={item.imageUrl} className="w-full h-full object-contain p-2 relative z-10 drop-shadow-md" />
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
                    <div className="w-8 h-8 rounded-full bg-[#D7E3FC] shrink-0 flex items-center justify-center"><Shirt size={14} className="text-primary/50" /></div>
                    <span>A pale blue silk blouse to pair with your existing bottoms.</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm bg-white/50 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-[#E6DFF1] shrink-0 flex items-center justify-center"><Sparkles size={14} className="text-primary/50" /></div>
                    <span>Lavender accessories (scarf or bag) to elevate neutral outfits.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pending Image Confirmation Modal */}
      <AnimatePresence>
        {pendingImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
                <h3 className="font-headline font-semibold">Categorize Item</h3>
                <button onClick={() => setPendingImage(null)} className="p-2 bg-surface-container-high rounded-full text-on-surface-variant hover:text-on-surface">
                  <X size={16} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="aspect-square rounded-2xl bg-surface-container-low mb-6 relative flex items-center justify-center overflow-hidden">
                   {/* Simulated transparent background pattern */}
                   <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#665881 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                  <img src={pendingImage} alt="Pending" className="w-full h-full object-contain p-4 relative z-10 drop-shadow-xl" />
                  <div className="absolute top-2 right-2 bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-full font-bold tracking-wider backdrop-blur-md z-20">
                    BG REMOVED
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Select Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                          selectedCategory === cat.value 
                            ? 'bg-primary text-on-primary' 
                            : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleConfirmAdd}
                  className="w-full bg-primary text-on-primary py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  <Check size={20} /> Add to Wardrobe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
