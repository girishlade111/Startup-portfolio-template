export interface Song {
  id: number;
  title: string;
  src: string;
  duration?: number;
}

const R2_BASE = process.env.NEXT_PUBLIC_CF_R2_BASE_URL || "/music";

// For development: place MP3 files in /public/music/ named song-1.mp3, song-2.mp3, etc.
// For production: upload to Cloudflare R2 and set NEXT_PUBLIC_CF_R2_BASE_URL in Vercel env vars
export const SONGS: Song[] = [
  { id: 1, title: "Code to Empire", src: `${R2_BASE}/song-1.mp3` },
  { id: 2, title: "Built in Silence", src: `${R2_BASE}/song-2.mp3` },
  { id: 3, title: "Lade Stack Rising", src: `${R2_BASE}/song-3.mp3` },
  { id: 4, title: "Zero to System", src: `${R2_BASE}/song-4.mp3` },
  { id: 5, title: "Architect of the Future", src: `${R2_BASE}/song-5.mp3` },
  { id: 6, title: "Midnight Deployments", src: `${R2_BASE}/song-6.mp3` },
  { id: 7, title: "Vision Over Comfort", src: `${R2_BASE}/song-7.mp3` },
  { id: 8, title: "One Man Infrastructure", src: `${R2_BASE}/song-8.mp3` },
  { id: 9, title: "From Local to Limitless", src: `${R2_BASE}/song-9.mp3` },
  { id: 10, title: "The Grind Protocol", src: `${R2_BASE}/song-10.mp3` },
  { id: 11, title: "Digital Bloodline", src: `${R2_BASE}/song-11.mp3` },
  { id: 12, title: "No Sleep Just Build", src: `${R2_BASE}/song-12.mp3` },
  { id: 13, title: "System Over Hype", src: `${R2_BASE}/song-13.mp3` },
  { id: 14, title: "Legacy in Code", src: `${R2_BASE}/song-14.mp3` },
  { id: 15, title: "Infinite Stack", src: `${R2_BASE}/song-15.mp3` },
];

export const DEFAULT_SONG_INDEX = 0;