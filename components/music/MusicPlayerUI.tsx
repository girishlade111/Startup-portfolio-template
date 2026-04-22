'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
import { useMusicContext } from '@/components/music/MusicPlayerProvider';
import { AudioVisualizer } from '@/components/music/AudioVisualizer';
import { formatDuration } from '@/lib/utils';

export function MusicPlayerUI() {
  const {
    currentSong,
    isPlaying,
    isShuffle,
    volume,
    currentTime,
    duration,
    isMinimized,
    shuffledQueue,
    playNext,
    playPrev,
    togglePlay,
    toggleShuffle,
    seekTo,
    setVolume,
    toggleMinimize,
  } = useMusicContext();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentIndex = shuffledQueue.indexOf(currentSong.id - 1) + 1;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seekTo(percentage * duration);
  };

  const handleToggleMute = () => {
    setVolume(volume > 0 ? 0 : 0.7);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle if not typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        if (e.shiftKey) {
          playNext();
        } else {
          seekTo(Math.min(currentTime + 5, duration));
        }
        break;
      case 'ArrowLeft':
        if (e.shiftKey) {
          playPrev();
        } else {
          seekTo(Math.max(currentTime - 5, 0));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(Math.min(volume + 0.1, 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(Math.max(volume - 0.1, 0));
        break;
      case 'm':
      case 'M':
        handleToggleMute();
        break;
    }
  }, [togglePlay, playNext, playPrev, seekTo, setVolume, currentTime, duration, volume]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const glassStyles = {
    backdropFilter: 'blur(24px) saturate(180%)',
  };

  return (
    <div
      className="fixed z-50"
      role="region"
      aria-label="Music Player"
      style={{
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // MINIMIZED — Floating pill
          <motion.div
            key="minimized"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={togglePlay}
            className="flex items-center gap-3 cursor-pointer select-none"
            style={{
              minWidth: 260,
              maxWidth: 360,
              height: 52,
              borderRadius: 9999,
              background: 'rgba(10, 22, 40, 0.92)',
              border: '1px solid rgba(212,175,55,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)',
              ...glassStyles,
            }}
          >
            <div className="flex items-center gap-3 px-4 w-full">
              {/* Equalizer icon — 3 bars animating */}
              <div className="flex items-end gap-[2px] h-5 flex-shrink-0">
                <div
                  className="w-[2px] rounded-[2px]"
                  style={{
                    backgroundColor: '#D4AF37',
                    height: isPlaying ? 'auto' : 4,
                    animation: isPlaying ? 'eqBar1 0.8s ease-in-out infinite' : 'none',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                />
                <div
                  className="w-[2px] rounded-[2px]"
                  style={{
                    backgroundColor: '#D4AF37',
                    height: isPlaying ? 'auto' : 4,
                    animation: isPlaying ? 'eqBar2 0.6s ease-in-out infinite 0.2s' : 'none',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                />
                <div
                  className="w-[2px] rounded-[2px]"
                  style={{
                    backgroundColor: '#D4AF37',
                    height: isPlaying ? 'auto' : 4,
                    animation: isPlaying ? 'eqBar3 1s ease-in-out infinite 0.1s' : 'none',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                />
              </div>

              {/* Song info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate max-w-[160px]">
                  {currentSong.title}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  LadeStack Radio
                </p>
              </div>

              {/* Play/Pause */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition flex-shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                aria-pressed={isPlaying}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3 ml-0.5" />
                )}
              </button>

              {/* Chevron up — expand */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize();
                }}
                className="text-muted-foreground hover:text-foreground transition flex-shrink-0"
                aria-label="Expand player"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          // EXPANDED — Glass panel
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
            style={{
              width: 380,
              maxWidth: '95vw',
              borderRadius: 24,
              padding: 20,
              background: 'rgba(10, 22, 40, 0.92)',
              border: '1px solid rgba(212,175,55,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08), 0 0 60px rgba(212,175,55,0.04)',
              ...glassStyles,
            }}
          >
            {/* ROW 1 — Header */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-primary uppercase tracking-widest">
                LadeStack Radio
              </span>
              <button
                onClick={toggleMinimize}
                className="text-muted-foreground hover:text-foreground transition"
                aria-label="Minimize player"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ROW 2 — Visualizer */}
            <div className="h-[40px]">
              <AudioVisualizer />
            </div>

            {/* ROW 3 — Song Info */}
            <div className="flex items-center gap-3">
              {/* Rotating disc */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B48C14, #10B981)',
                  animation: isPlaying ? 'spin 10s linear infinite' : 'none',
                }}
              >
                <div className="w-4 h-4 rounded-full bg-navy" style={{ backgroundColor: 'rgba(10,22,40,0.9)' }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {currentSong.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Original · LadeStack · {currentIndex} / {shuffledQueue.length}
                </p>
              </div>
            </div>

            {/* ROW 4 — Progress Bar */}
            <div>
              <div
                className="relative h-1.5 w-full bg-border/50 rounded-full cursor-pointer group"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Track progress"
                aria-valuenow={Math.round(currentTime)}
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuetext={`${formatDuration(currentTime)} of ${formatDuration(duration)}`}
                tabIndex={0}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(to right, #D4AF37, #10B981)',
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{
                    left: `${progress}%`,
                    transform: `translateX(-50%) translateY(-50%)`,
                    backgroundColor: '#D4AF37',
                    boxShadow: '0 0 8px rgba(212,175,55,0.5)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">
                  {formatDuration(currentTime)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>

            {/* ROW 5 — Controls */}
            <div className="flex items-center justify-between">
              {/* Shuffle */}
              <button
                onClick={toggleShuffle}
                className={`transition ${isShuffle ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Toggle shuffle"
                aria-pressed={isShuffle}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                onClick={playPrev}
                className="text-foreground hover:text-primary transition"
                aria-label="Previous track"
              >
                <SkipBack className="w-[18px] h-[18px]" />
              </button>

              {/* Play/Pause — main button */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 hover:scale-105 transition-all"
                style={{
                  boxShadow: '0 0 20px rgba(212,175,55,0.3)',
                }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                aria-pressed={isPlaying}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={playNext}
                className="text-foreground hover:text-primary transition"
                aria-label="Next track"
              >
                <SkipForward className="w-[18px] h-[18px]" />
              </button>

              {/* Volume */}
              <button
                onClick={handleToggleMute}
                className="text-muted-foreground hover:text-foreground transition"
                aria-label={volume > 0 ? 'Mute' : 'Unmute'}
                aria-pressed={volume === 0}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2">
              <VolumeX className="w-3 h-3 text-muted-foreground" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 appearance-none bg-border/50 rounded-full cursor-pointer accent-primary"
                style={{
                  accentColor: '#D4AF37',
                }}
                role="slider"
                aria-label="Volume"
                aria-valuenow={Math.round(volume * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${Math.round(volume * 100)}%`}
              />
              <Volume2 className="w-3 h-3 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equalizer keyframes */}
      <style jsx global>{`
        @keyframes eqBar1 {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes eqBar2 {
          0%, 100% { height: 4px; }
          50% { height: 20px; }
        }
        @keyframes eqBar3 {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
