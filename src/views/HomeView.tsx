import { motion } from 'motion/react';
import { Camera, Droplet, Contrast, Sun } from 'lucide-react';
import { ViewState } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-40 px-6 max-w-screen-xl mx-auto min-h-screen flex flex-col items-center"
    >
      <div className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center px-4 py-1.5 bg-secondary-container/30 rounded-full">
          <span className="text-[10px] font-headline font-semibold tracking-widest text-on-secondary-container uppercase">
            Advanced Color Science
          </span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extralight tracking-tight leading-[1.1] text-on-surface">
          Discover your <br />
          <span className="font-bold text-primary">Natural Glow.</span>
        </h1>
        <p className="text-on-surface-variant leading-relaxed max-w-md mx-auto text-sm md:text-base font-light">
          Professional-grade spectral analysis to define your perfect seasonal palette and aesthetic.
        </p>
      </div>

      <div className="w-full max-w-md luminous-card rounded-[3rem] p-10 text-center space-y-8 mb-12">
        <div className="w-20 h-20 mx-auto bg-primary-container rounded-full flex items-center justify-center text-primary">
          <Camera size={32} />
        </div>
        <div>
          <h3 className="font-headline text-2xl font-semibold text-on-surface mb-2">Photo Recognition</h3>
          <p className="text-on-surface-variant text-sm px-4">
            Instant spectral analysis of your skin's unique undertones and contrast levels.
          </p>
        </div>
        <button
          onClick={() => onNavigate('camera')}
          className="w-full bg-primary text-on-primary rounded-full py-4 font-headline font-semibold tracking-wide shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Start Diagnosis
        </button>
        <div className="text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em]">
          Real-time AI Scanning â 2 Min
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        {[
          { icon: Droplet, title: 'Undertone Detection', desc: 'Precise measurement of cool, warm, or olive skin base temperatures.', color: 'bg-[#e1f9f2]', text: 'text-[#4e635f]' },
          { icon: Contrast, title: 'Saturation Analysis', desc: 'Identifying your ideal color intensity from muted to vibrant tones.', color: 'bg-secondary-container', text: 'text-secondary' },
          { icon: Sun, title: 'True-Light Correction', desc: 'Our engine compensates for ambient lighting conditions for 99.8% accuracy.', color: 'bg-surface-container-high', text: 'text-on-surface' },
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl ${feature.color} ${feature.text} flex items-center justify-center shrink-0`}>
              <feature.icon size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-headline font-semibold text-on-surface mb-1">{feature.title}</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
