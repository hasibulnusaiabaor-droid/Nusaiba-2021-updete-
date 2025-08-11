import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds for demo (change to 30000 for 30 seconds)
    const interval = 100;
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-pulse mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4">
            Nusaiba
          </h1>
          <p className="text-2xl text-purple-200">
            Redefining Connection, Creativity, and Community
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-80 bg-white/20 rounded-full h-2 mx-auto">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-white/70 mt-4 text-sm">Loading your experience...</p>
      </div>
    </div>
  );
}