import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Camera as CameraIcon, Wand2 } from 'lucide-react';
import { ViewState, ColorType } from '../types';

interface CameraViewProps {
  onComplete: (result: ColorType) => void;
}

export function CameraView({ onComplete }: CameraViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    
    // Simulate scanning process
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Randomly assign a color type for demo purposes
          const types: ColorType[] = ['Summer Cool', 'Spring Warm', 'Autumn Warm', 'Winter Cool'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          onComplete(randomType);
        }, 500);
      }
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full pt-16 pb-28 flex flex-col items-center justify-center overflow-hidden bg-[#f0f2f5]"
    >
      {/* Technical Camera Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#665881 1px, transparent 1px), linear-gradient(90deg, #665881 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Camera UI Overlay */}
      <div className="relative z-10 w-full max-w-md aspect-[3/4] flex items-center justify-center">
        {/* Viewfinder Corners */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />

        {/* Face Scanning Ring */}
        <div className={`w-64 h-80 rounded-[5rem] border border-primary/20 flex items-center justify-center bg-white/5 relative transition-all duration-500 ${isScanning ? 'scale-105 bg-primary/10' : ''}`}>
          <div className="absolute inset-0 w-full h-full rounded-[4.8rem] border border-primary/10 animate-pulse" />
          {isScanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[bounce_2s_infinite]" />
          )}
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary/60 font-bold mb-4">
            {isScanning ? 'Analyzing...' : 'Awaiting Subject'}
          </div>
        </div>

        {/* Side Swatches */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="text-[10px] uppercase tracking-widest text-primary/60 font-headline mb-2 origin-left -rotate-90">Cool</div>
          {['#E8F1F2', '#D7E3FC', '#B6CCFE', '#ABC4FF'].map((color, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white/60 shadow-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="text-[10px] uppercase tracking-widest text-primary/60 font-headline mb-2 origin-right rotate-90 translate-x-4">Warm</div>
          {['#FEEAFA', '#FFDDE1', '#FA9393', '#FAD2E1'].map((color, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white/60 shadow-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {/* Floating Info Glass Card */}
      <div className="absolute bottom-32 w-[90%] max-w-sm glass-card rounded-[2rem] p-6 shadow-2xl border border-white/40">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">Diagnostic Mode</span>
              <h2 className="text-xl font-headline font-bold text-primary mt-1">Chroma Analysis</h2>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter">
              {isScanning ? `${progress}%` : 'READY'}
            </div>
          </div>
          <p className="text-sm text-on-surface-variant/80 leading-relaxed font-body">
            Position face within the viewfinder. The system will analyze <span className="text-primary font-semibold">skin undertone</span>, <span className="text-primary font-semibold">chroma saturation</span>, and <span className="text-primary font-semibold">contrast levels</span>.
          </p>
          <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Capture Trigger */}
      <div className="absolute bottom-6 flex items-center justify-center w-full z-20">
        <div className="flex items-center gap-12">
          <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary/60 hover:text-primary transition-all">
            <RefreshCcw size={20} />
          </button>
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className={`w-20 h-20 rounded-full p-1.5 border-2 border-primary/30 transition-transform ${isScanning ? 'scale-90 opacity-50' : 'hover:scale-105 active:scale-95'}`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg">
              <CameraIcon className="text-on-primary" size={32} />
            </div>
          </button>
          <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary/60 hover:text-primary transition-all">
            <Wand2 size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
