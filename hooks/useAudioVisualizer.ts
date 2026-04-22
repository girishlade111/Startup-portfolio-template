// NOTE: Howler.ctx is the shared WebAudio context. Some browsers require user interaction
// before AudioContext can run. This is already handled by the auto-play strategy in useMusicPlayer.ts
// If visualizer doesn't animate, check that Howler.ctx.state === 'running'

import { Howl } from 'howler';
import { useEffect, useState } from 'react';

interface AudioVisualizerData {
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
  bufferLength: number;
  isConnected: boolean;
}

export function useAudioVisualizer(isPlaying: boolean): AudioVisualizerData {
  const [audioData, setAudioData] = useState<AudioVisualizerData>({
    analyser: null,
    dataArray: null,
    bufferLength: 0,
    isConnected: false,
  });

  useEffect(() => {
    if (!isPlaying) {
      setAudioData({
        analyser: null,
        dataArray: null,
        bufferLength: 0,
        isConnected: false,
      });
      return;
    }

    // Try to connect to Howler's AudioContext
    try {
      // Access Howler's internal AudioContext
      const howlProto = Object.getPrototypeOf(Howl.prototype);
      const ctx = (Howl as unknown as { ctx: AudioContext }).ctx;
      
      if (!ctx || ctx.state !== 'running') {
        return;
      }

      // Create analyser node
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Connect to audio destination
      try {
        const destination = ctx.destination;
        analyser.connect(destination);
      } catch {
        // Destination might already be connected
      }

      setAudioData({
        analyser,
        dataArray,
        bufferLength,
        isConnected: true,
      });
    } catch (error) {
      console.error('Failed to connect audio visualizer:', error);
      setAudioData({
        analyser: null,
        dataArray: null,
        bufferLength: 0,
        isConnected: false,
      });
    }
  }, [isPlaying]);

  return audioData;
}