import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MoveHorizontal, Sparkles, Hammer, CheckCircle2 } from 'lucide-react';

export interface BeforeAfterItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  description: string;
  highlightStats?: { label: string; value: string }[];
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
  initialPosition?: number; // percentage 0-100
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes (Obra / Estado Inicial)',
  afterLabel = 'Depois (Entrega STAK)',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  initialPosition = 50,
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updatePosition(clientX);
      });
    },
    [updatePosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleStopDragging = useCallback(() => {
    setIsDragging(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleStopDragging);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleStopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStopDragging);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDragging]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative select-none overflow-hidden rounded-xl border border-white/15 bg-black cursor-ew-resize group shadow-2xl ${aspectRatio} ${className}`}
    >
      {/* 1. "After" Image (Base Layer - 100% full view) */}
      <img
        src={afterImage}
        alt={afterLabel}
        loading="eager"
        decoding="sync"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* 2. "Before" Image (Hardware-Accelerated GPU clip-path without layout reflows) */}
      <div
        className="absolute inset-0 pointer-events-none will-change-[clip-path]"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          loading="eager"
          decoding="sync"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95 contrast-[0.98]"
        />
        {/* Subtle architectural tint to highlight the raw/work-in-progress state */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* 3. Floating Status Badges */}
      {/* Before Label (Left) */}
      <div
        className={`absolute top-4 left-4 z-20 transition-opacity duration-200 pointer-events-none ${
          sliderPosition < 12 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-mono uppercase tracking-wider text-amber-200/90 shadow-lg">
          <Hammer className="w-3.5 h-3.5 text-amber-400" />
          {beforeLabel}
        </span>
      </div>

      {/* After Label (Right) */}
      <div
        className={`absolute top-4 right-4 z-20 transition-opacity duration-200 pointer-events-none ${
          sliderPosition > 88 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/85 backdrop-blur-md border border-[#c6a87c]/40 text-[11px] font-mono uppercase tracking-wider text-[#c6a87c] shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#c6a87c]" />
          {afterLabel}
        </span>
      </div>

      {/* 4. Vertical Divider Line & Interactive Handle */}
      <div
        className="absolute top-0 bottom-0 z-30 pointer-events-none will-change-transform"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Glowing vertical line */}
        <div className="w-[2px] h-full bg-gradient-to-b from-[#c6a87c]/40 via-[#c6a87c] to-[#c6a87c]/40 shadow-[0_0_12px_rgba(198,168,124,0.6)]" />

        {/* Circular Draggable Button */}
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#111216] border-2 border-[#c6a87c] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto transition-transform duration-150 ${
            isDragging ? 'scale-110 ring-4 ring-[#c6a87c]/30' : 'hover:scale-105'
          }`}
          title="Arraste para comparar Antes e Depois"
        >
          <MoveHorizontal className="w-5 h-5 text-[#c6a87c]" />
        </div>
      </div>

      {/* 5. Instruction hint for users on bottom center */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/70 uppercase tracking-widest flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <MoveHorizontal className="w-3 h-3 text-[#c6a87c]" />
        <span>Arraste a barra para comparar</span>
      </div>
    </div>
  );
};
