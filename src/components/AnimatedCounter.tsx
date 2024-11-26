import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AnimatedCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function AnimatedCounter({
  initialValue = 1,
  min = 0,
  max = 10,
  onChange,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(initialValue);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [isPressing, setIsPressing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCount = (newCount: number) => {
    if (newCount >= min && newCount <= max && !isAnimating) {
      setDirection(newCount > count ? 'up' : 'down');
      setCount(newCount);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
      onChange?.(newCount);
    }
  };

  const handleMouseDown = () => !isAnimating && setIsPressing(true);
  const handleMouseUp = () => setIsPressing(false);
  const handleMouseLeave = () => setIsPressing(false);

  return (
    <div className="relative w-24 h-12">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50 shadow-sm backdrop-blur-sm transition-transform duration-200"
        style={{
          transform: isPressing ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        <div className="h-full flex items-center justify-between px-1.5">
          <button
            onClick={() => updateCount(count - 1)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            disabled={count <= min || isAnimating}
            className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-200/30 active:bg-purple-200/50 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Decrease"
          >
            <Minus size={20} className="transition-transform duration-200" style={{
              transform: isPressing ? 'scale(0.9)' : 'scale(1)'
            }} />
          </button>
          
          <div className="relative w-7 h-6 overflow-hidden">
            <div
              key={count}
              className="absolute inset-0 flex items-center justify-center text-purple-700 font-semibold"
              style={{
                animation: direction 
                  ? `slide${direction === 'up' ? 'FromTop' : 'FromBottom'} 300ms ease-in-out`
                  : undefined
              }}
            >
              {count}
            </div>
          </div>

          <button
            onClick={() => updateCount(count + 1)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            disabled={count >= max || isAnimating}
            className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-200/30 active:bg-purple-200/50 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Increase"
          >
            <Plus size={20} className="transition-transform duration-200" style={{
              transform: isPressing ? 'scale(0.9)' : 'scale(1)'
            }} />
          </button>
        </div>

        {/* Loading line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden rounded-b-xl">
          <div 
            className={`h-full bg-purple-500/30 transition-transform duration-600 ease-in-out ${
              isAnimating ? 'animate-loadingLine' : 'translate-x-[-100%]'
            }`}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideFromTop {
          from {
            transform: translateY(-120%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideFromBottom {
          from {
            transform: translateY(120%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes loadingLine {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}