'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import { SONGS, DEFAULT_SONG_INDEX } from '@/lib/songs';
import { shuffleArray } from '@/lib/utils';

export function useMusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(DEFAULT_SONG_INDEX);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(true);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [shuffledQueue, setShuffledQueue] = useState<number[]>([]);
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);
  
  const howlRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong = SONGS[currentSongIndex];

  // Initialize shuffled queue
  useEffect(() => {
    const queue = SONGS.map((_, i) => i);
    setShuffledQueue(shuffleArray(queue));
  }, []);

  // Create and manage Howl instance
  const createHowl = useCallback((songIndex: number) => {
    if (howlRef.current) {
      howlRef.current.unload();
    }

    const song = SONGS[songIndex];
    const howl = new Howl({
      src: [song.src],
      volume: volume,
      html5: true,
      format: ['mp3'],
      onend: () => playNext(),
      onload: () => {
        setDuration(howl.duration());
      },
      onloaderror: (_id, error) => {
        console.error('Song load error:', error);
      },
    });

    howlRef.current = howl;
    setCurrentSongIndex(songIndex);
    setCurrentTime(0);
  }, [volume]);

  // Play next song
  const playNext = useCallback(() => {
    const queue = isShuffle ? shuffledQueue : SONGS.map((_, i) => i);
    const currentIndex = queue.indexOf(currentSongIndex);
    const nextIndex = (currentIndex + 1) % queue.length;
    const nextSongIndex = queue[nextIndex];
    
    createHowl(nextSongIndex);
    if (isPlaying) {
      howlRef.current?.play();
    }
  }, [shuffledQueue, currentSongIndex, isShuffle, createHowl, isPlaying]);

  // Play previous song
  const playPrev = useCallback(() => {
    const queue = isShuffle ? shuffledQueue : SONGS.map((_, i) => i);
    const currentIndex = queue.indexOf(currentSongIndex);
    const prevIndex = currentIndex - 1 < 0 ? queue.length - 1 : currentIndex - 1;
    const prevSongIndex = queue[prevIndex];
    
    createHowl(prevSongIndex);
    if (isPlaying) {
      howlRef.current?.play();
    }
  }, [shuffledQueue, currentSongIndex, isShuffle, createHowl, isPlaying]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!howlRef.current) {
      createHowl(currentSongIndex);
    }

    if (isPlaying) {
      howlRef.current?.pause();
    } else {
      howlRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, createHowl, currentSongIndex]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    if (!isShuffle) {
      setShuffledQueue(shuffleArray(SONGS.map((_, i) => i)));
    }
    setIsShuffle(!isShuffle);
  }, [isShuffle]);

  // Seek to position
  const seekTo = useCallback((seconds: number) => {
    if (howlRef.current) {
      howlRef.current.seek(seconds);
      setCurrentTime(seconds);
    }
  }, []);

  // Set volume
  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (howlRef.current) {
      howlRef.current.volume(v);
    }
  }, []);

  // Toggle minimize
  const toggleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  // Time tracking interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (howlRef.current) {
          const seek = howlRef.current.seek();
          setCurrentTime(typeof seek === 'number' ? seek : 0);
        }
      }, 250);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Page Visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        howlRef.current?.pause();
      } else if (!document.hidden && isPlaying) {
        howlRef.current?.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  // First user interaction for autoplay compliance
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isFirstInteraction) {
        setIsFirstInteraction(true);
        
        // Wait 1.5 seconds then autoplay
        setTimeout(() => {
          if (!isPlaying && howlRef.current) {
            howlRef.current.play();
            setIsPlaying(true);
          }
        }, 1500);

        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isFirstInteraction, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
  }, []);

  return {
    songs: SONGS,
    currentSong,
    currentSongIndex,
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
  };
}