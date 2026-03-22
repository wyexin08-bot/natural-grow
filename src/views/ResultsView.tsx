import { motion } from 'motion/react';
import { Download, Share2, Sparkles } from 'lucide-react';
import { ColorType } from '../types';

interface ResultsViewProps {
  colorType: ColorType | null;
  onNavigate: (view: string) => void;
}

const COLOR_DATA = {
  'Summer Cool': {
    desc: 'Your palette is defined by refreshing, soft, and sophisticated cool tones. Think of a hazy summer morning by the sea.',
    dominant: 'Lavender Mist',
    image: 'https://images.unsplash.com/photo-1515347619152-16b601f01c23?auto=format&fit=crop&q=80&w=800',
    palette: [
      { name: 'Cloud Blue', hex: '#DEE5EF' },
      { name: 'Pale Orchid', hex: '#E6DFF1' },
      { name: 'Advanced Grey', hex: '#D1D9D9' },
      { name: 'Cool Rose', hex: '#F4E1E6' },
    ],
    jewelry: {
      title: 'Lustrous Accents',
      desc: 'For Summer Cool types, silver and white gold are your best allies. Steer away from yellow golds. Pearls with a cool rosy or blue undertone will illuminate your complexion instantly.',
      items: ['Frosted Silver Finishes', 'Moonstone & Aquamarine', 'Natural Sea Pearls'],
      image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00ef?auto=format&fit=crop&q=80&w=800'
    }
  },
  'Spring Warm': {
    desc: 'Your palette is defined by high clarity and warm undertones. Avoid muddy tones and embrace the translucency of water-inspired colors.',
    dominant: 'Peach Coral',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    palette: [
      { name: 'Creamy Apricot', hex: '#f9dbbd' },
      { name: 'Soft Coral', hex: '#fbdbde' },
      { name: 'Warm Peach', hex: '#ffe5d9' },
      { name: 'Milky White', hex: '#f2f4f4' },
    ],
    jewelry: {
      title: 'Dainty Gold Minimalism',
      desc: '14k Yellow gold accents harmonize perfectly with the vitality of Spring Warm types.',
      items: ['Light Yellow Gold', 'Rose Gold Accents', 'Clear Crystals'],
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'
    }
  },
  'Autumn Warm': {
    desc: 'Your palette is defined by rich, muted, and earthy warm tones. Think of a golden autumn afternoon.',
    dominant: 'Maple Brown',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800',
    palette: [
      { name: 'Olive Green', hex: '#808000' },
      { name: 'Terracotta', hex: '#E2725B' },
      { name: 'Mustard Yellow', hex: '#FFDB58' },
      { name: 'Warm Beige', hex: '#F5F5DC' },
    ],
    jewelry: {
      title: 'Rich Earthy Accents',
      desc: 'Antique gold, bronze, and copper are your best friends. Natural stones with warm, deep colors enhance your natural glow.',
      items: ['Antique Gold', 'Amber & Topaz', 'Wooden Elements'],
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800'
    }
  },
  'Winter Cool': {
    desc: 'Your palette is defined by high contrast, vivid, and icy cool tones. Think of a crisp winter night.',
    dominant: 'Sapphire Blue',
    image: 'https://images.unsplash.com/photo-1516483638261-f40af5bea09fb?auto=format&fit=crop&q=80&w=800',
    palette: [
      { name: 'Icy Blue', hex: '#A5F2F3' },
      { name: 'Fuchsia', hex: '#FF00FF' },
      { name: 'Emerald Green', hex: '#50C878' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    jewelry: {
      title: 'Striking Silver Accents',
      desc: 'Platinum, silver, and white gold provide the perfect high-contrast backdrop for your vivid coloring.',
      items: ['Platinum & Silver', 'Diamonds & Sapphires', 'Onyx'],
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    }
  }
};

export function ResultsView({ colorType, onNavigate }: ResultsViewProps) {
  if (!colorType) {
    return (
      <div className="pt-32 px-6 text-center h-screen flex flex-col items-center justify-center">
        <h2 className="font-headline text-2xl mb-4">No Analysis Found</h2>
        <p className="text-on-surface-variant mb-8">Please complete the color diagnosis first.</p>
        <button 
          onClick={() => onNavigate('camera')}
          className="bg-primary text-on-primary px-8 py-3 rounded-full"
        >
          Go to Scanner
        </button>
      </div>
    );
  }

  const data = COLOR_DATA[colorType];
  const [season, tone] = colorType.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-32 px-6 max-w-screen-xl mx-auto"
    >
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-12 items-end mb-20">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <span className="font-headline text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
            Personal Analysis
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tight text-on-surface mb-6 leading-[1.1]">
            {season} <br />
            <span className="font-extrabold text-primary">{tone} Type</span>
          </h1>
          <p className="text-on-surface-variant max-w-xs leading-relaxed font-light text-sm">
            {data.desc}
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-medium text-sm tracking-wide flex items-center gap-2">
              <Download size={16} /> Report
            </button>
            <button className="bg-surface-container-high px-6 py-3 rounded-full font-medium text-sm tracking-wide text-primary flex items-center gap-2">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-end">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden luminous-card">
            <img src={data.image} alt={colorType} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 glass-card p-6 rounded-2xl border border-white/20">
              <span className="block text-[10px] uppercase tracking-widest text-on-surface opacity-90 mb-1">Dominant Tone</span>
              <span className="font-headline font-bold text-lg text-on-surface">{data.dominant}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Palette */}
      <section className="mb-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-headline text-2xl font-light tracking-tight">Signature Palette</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.palette.map((color, idx) => (
            <div 
              key={idx} 
              className="aspect-square rounded-2xl flex flex-col justify-end p-4 transition-transform hover:scale-[1.02] shadow-sm"
              style={{ backgroundColor: color.hex }}
            >
              <span className="text-[10px] font-medium text-black/60 uppercase bg-white/30 backdrop-blur-sm p-2 rounded-lg inline-block w-fit">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Jewelry Recommendations */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 rounded-[3rem] overflow-hidden luminous-card aspect-video relative group">
            <img src={data.jewelry.image} alt="Jewelry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="md:col-span-5 px-4">
            <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
            <h3 className="font-headline text-3xl font-light mb-6">{data.jewelry.title}</h3>
            <p className="text-on-surface-variant font-light leading-relaxed mb-8">
              {data.jewelry.desc}
            </p>
            <ul className="space-y-4">
              {data.jewelry.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-on-surface">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Wardrobe CTA */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-primary to-primary-container p-12 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 max-w-lg mx-auto">
            <Sparkles className="mx-auto text-on-primary mb-4" size={32} />
            <h2 className="font-headline text-3xl font-light text-on-primary mb-4 leading-tight">Apply to your Wardrobe</h2>
            <p className="text-on-primary/80 text-sm mb-8 font-light">
              Upload photos of your clothes and let our AI suggest the perfect combinations based on your {colorType} profile.
            </p>
            <button 
              onClick={() => onNavigate('wardrobe')}
              className="bg-on-primary text-primary px-8 py-4 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Open Digital Wardrobe
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
