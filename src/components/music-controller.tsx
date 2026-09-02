"use client";

import { Music2, Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const volumeKey = "adobo-music-volume";
const enabledKey = "adobo-music-enabled";
const defaultVolume = 0.25;

export function MusicController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window === "undefined") return defaultVolume;
    const storedVolume = Number(localStorage.getItem(volumeKey));
    return Number.isFinite(storedVolume) && storedVolume >= 0 && storedVolume <= 1 ? storedVolume : defaultVolume;
  });

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    localStorage.setItem(volumeKey, String(volume));
  }, [volume]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        localStorage.setItem(enabledKey, "true");
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      localStorage.setItem(enabledKey, "false");
      setPlaying(false);
    }
  }

  function changeVolume(value: string) {
    setVolume(Number(value) / 100);
  }

  return <>
    <audio ref={audioRef} src="/audio/adobo-music.mp3" loop preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-hidden="true" />
    <aside className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-6 z-40 font-mono text-[10px] uppercase tracking-[.14em] text-paper sm:left-6" aria-label="Background music controller">
      {expanded ? <div className="flex items-center gap-3 border border-paper/30 bg-forest px-3 py-2 shadow-lg">
        <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause background music" : "Play background music"} className="grid size-9 shrink-0 place-items-center border border-gold text-gold transition-colors hover:bg-gold hover:text-forest">{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
        <span className="hidden text-paper/70 sm:inline">Now wandering</span>
        <Volume2 size={14} className="text-gold" aria-hidden="true" />
        <label className="sr-only" htmlFor="music-volume">Music volume</label>
        <input id="music-volume" type="range" min="0" max="100" step="1" value={Math.round(volume * 100)} onChange={event => changeVolume(event.target.value)} aria-label="Music volume" className="w-20 accent-gold sm:w-24" />
        <button type="button" onClick={() => setExpanded(false)} aria-label="Collapse music controller" className="ml-1 text-paper/70 transition-colors hover:text-gold"><X size={15} aria-hidden="true" /></button>
      </div> : <button type="button" onClick={() => setExpanded(true)} aria-label="Open music controller" className="grid size-11 place-items-center border border-paper/30 bg-forest text-gold shadow-lg transition-colors hover:border-gold" aria-expanded="false"><Music2 size={17} aria-hidden="true" /></button>}
    </aside>
  </>;
}
