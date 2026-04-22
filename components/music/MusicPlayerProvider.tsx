'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

interface MusicContextType {
  songs: typeof import('@/lib/songs').SONGS;
  currentSong: ReturnType<typeof useMusicPlayer>['currentSong'];
  currentSongIndex: number;
  isPlaying: boolean;
  isShuffle: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isMinimized: boolean;
  shuffledQueue: number[];
  playNext: () => void;
  playPrev: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (v: number) => void;
  toggleMinimize: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const player = useMusicPlayer();

  return (
    <MusicContext.Provider value={player}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within MusicPlayerProvider');
  }
  return context;
}