import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Camera as CameraIcon, Wand2, SwitchCamera, Upload } from 'lucide-react';
import { ViewState, ColorType } from '../types';

interface CameraViewProps {
  onComplete: (result: ColorType) => void;
}

export function CameraView({ onComplete }: CameraViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode }
        });
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        currentStream = mediaStream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    if (!capturedImage) {
      startCamera();
    }

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode, capturedImage]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const startAnalysis = () => {
    setIsScanning(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const types: ColorType[] = ['Summer Cool', 'Spring Warm', 'Autumn Warm', 'Winter Cool'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          onComplete(randomType);
        }, 500);
      }
    }, 100);
  };

  const handleScan = () => {
    if (isScanning) return;

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (facingMode === 'user') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
      }
    }
    
    startAnalysis();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full pt-16 pb-28 flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Video / Captured Image Background */}
      {capturedImage ? (
        <img 
          src={capturedImage} 
          alt="Captured" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
        />
      ) : (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
        />
      )}
      <canvas ref={canvasRef} className="hidden" />

      {/* Technical Camera Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-10" 
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Capture Trigger - Moved to Top */}
      <div className="absolute top-24 flex items-center justify-center w-full z-30">
        <div className="flex items-center gap-6 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg">
          <button onClick={toggleCamera} disabled={isScanning || !!capturedImage} className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-white transition-all disabled:opacity-50">
            <SwitchCamera size={20} />
          </button>
          <button 
            onClick={handleScan}
            disabled={isScanning || (!hasPermission && !capturedImage)}
            className={`w-16 h-16 rounded-full p-1 border-2 border-white/80 transition-transform ${isScanning ? 'scale-90 opacity-50' : 'hover:scale-105 active:scale-95'}`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg">
              <CameraIcon className="text-on-primary" size={28} />
            </div>
          </button>
          <label className={`w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-white transition-all cursor-pointer ${(isScanning || !!capturedImage) ? 'opacity-50 pointer-events-none' : ''}`}>
            <Upload size={20} />
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Fallback if no camera permission */}
      {!hasPermission && hasPermission !== null && !capturedImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/90 backdrop-blur-sm z-20 px-6 text-center">
          <div>
            <CameraIcon size={48} className="mx-auto text-on-surface-variant/50 mb-4" />
            <h3 className="font-headline text-xl font-semibold mb-2">Camera Access Required</h3>
            <p className="text-on-surface-variant mb-6 text-sm">Please allow camera access or upload a photo to continue the color analysis.</p>
            <label className="bg-primary text-on-primary px-8 py-3 rounded-full inline-block cursor-pointer shadow-lg hover:scale-105 transition-transform">
              Upload Photo Instead
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      )}

      {/* Camera UI Overlay */}
      <div className="relative z-10 w-full max-w-md aspect-[3/4] flex items-center justify-center pointer-events-none">
        {/* Viewfinder Corners */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-white/60 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-white/60 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-white/60 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-white/60 rounded-br-2xl" />

        {/* Face Scanning Ring */}
        <div className={`w-64 h-80 rounded-[5rem] border border-white/40 flex items-center justify-center bg-white/5 relative transition-all duration-500 ${isScanning ? 'scale-105 bg-primary/20 backdrop-blur-sm' : ''}`}>
          <div className="absolute inset-0 w-full h-full rounded-[4.8rem] border border-white/30 animate-pulse" />
          {isScanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-[bounce_2s_infinite]" />
          )}
          <div className="text-[10px] uppercase tracking-[0.3em] text-white font-bold mb-4 drop-shadow-md">
            {isScanning ? 'Analyzing...' : 'Awaiting Subject'}
          </div>
        </div>

        {/* Side Swatches */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="text-[10px] uppercase tracking-widest text-white font-headline mb-2 origin-left -rotate-90 drop-shadow-md">Cool</div>
          {['#E8F1F2', '#D7E3FC', '#B6CCFE', '#ABC4FF'].map((color, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white/60 shadow-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="text-[10px] uppercase tracking-widest text-white font-headline mb-2 origin-right rotate-90 translate-x-4 drop-shadow-md">Warm</div>
          {['#FEEAFA', '#FFDDE1', '#FA9393', '#FAD2E1'].map((color, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white/60 shadow-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {/* Floating Info Glass Card */}
      <div className="absolute bottom-32 w-[90%] max-w-sm glass-card bg-white/60 rounded-[2rem] p-6 shadow-2xl border border-white/40 z-20">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold">Diagnostic Mode</span>
              <h2 className="text-xl font-headline font-bold text-primary mt-1">Chroma Analysis</h2>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter">
              {isScanning ? `${progress}%` : 'READY'}
            </div>
          </div>
          <p className="text-sm text-on-surface-variant/90 leading-relaxed font-body">
            Position face within the viewfinder. The system will analyze <span className="text-primary font-semibold">skin undertone</span>, <span className="text-primary font-semibold">chroma saturation</span>, and <span className="text-primary font-semibold">contrast levels</span>.
          </p>
          <div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
