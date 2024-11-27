"use client";
import React from "react";

export interface PlayerProps {
  isPlaying?: boolean;
  playSong?: () => Promise<void>;
  pauseSong?: () => Promise<void>;
  nextSong?: () => void;
  previousSong?: () => void;
  isBuffering?: boolean;
  currentSong?: number;
  songs?: { title: string; src: string }[];
}

function PrevSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="size-6"
      viewBox="0 0 16 16"
    >
      <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5" />
    </svg>
  );
}

function PauseSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="size-6"
      viewBox="0 0 16 16"
    >
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
    </svg>
  );
}

function PlaySvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="size-6"
      viewBox="0 0 16 16"
    >
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
    </svg>
  );
}

function NextSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="size-6"
      viewBox="0 0 16 16"
    >
      <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5" />
    </svg>
  );
}

export const Player: React.FC<PlayerProps> = ({
  isPlaying,
  playSong,
  pauseSong,
  nextSong,
  previousSong,
  isBuffering,
  currentSong = 0,
  songs = [],
}) => {
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSong?.();
    } else {
      playSong?.();
    }
  };

  return (
    <div className="w-72 px-6 py-2 rounded-lg bg-primary/5 text-primary-foreground shadow-lg border border-primary/10 backdrop-blur-md mt-40">
      <h2 className="text-2xl font-bold text-center mb-4 truncate">
        {songs[currentSong]?.title || "No Track Selected"}
      </h2>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={previousSong}
          aria-label="Previous Song"
          className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
        >
          <PrevSvg />
        </button>

        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
        >
          {isPlaying ? <PauseSvg /> : <PlaySvg />}
        </button>

        <button
          onClick={nextSong}
          className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          aria-label="Next Song"
        >
          <NextSvg />
        </button>
      </div>

      {isBuffering && (
        <div className="text-center text-sm mt-2 text-primary-foreground/70">
          Buffering...
        </div>
      )}
    </div>
  );
};
