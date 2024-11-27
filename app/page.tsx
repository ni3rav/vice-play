"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MediaControls } from "@/components/MediaControls";
import { SongDetails } from "@/components/SongDetails";

export default function Home() {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songs, setSongs] = useState<{ title: string; src: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [songHistory, setSongHistory] = useState<number[]>([]);
  const [isLinearMode, setIsLinearMode] = useState(true);

  const changeSong = useCallback(
    async (newIndex: number, addToHistory: boolean = true) => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current.load();
        }

        if (addToHistory) {
          setSongHistory((prev) => [...prev, currentSong]);
        }

        if (songs[newIndex]) {
          const newAudio = new Audio(songs[newIndex].src);

          newAudio.addEventListener("ended", () => {
            if (isLinearMode) {
              nextLinearSong();
            } else {
              nextRandomSong();
            }
          });
          newAudio.addEventListener("waiting", () => setIsBuffering(true));
          newAudio.addEventListener("playing", () => setIsBuffering(false));

          audioRef.current = newAudio;
          setCurrentSong(newIndex);

          await newAudio.play();
          setIsPlaying(true);
          setHasStarted(true);
        }
      } catch (error) {
        console.error("Error changing song:", error);
      }
    },
    [currentSong, isLinearMode, songs]
  );

  const nextLinearSong = useCallback(() => {
    if (currentSong + 1 < songs.length) {
      changeSong(currentSong + 1);
    } else {
      setIsLinearMode(false);
      nextRandomSong();
    }
  }, [changeSong, currentSong, songs.length]);

  const nextRandomSong = useCallback(() => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      changeSong(randomIndex);
    }
  }, [changeSong, songs.length]);

  const previousSong = useCallback(() => {
    setSongHistory((prev) => {
      if (prev.length > 0) {
        const lastSongIndex = prev[prev.length - 1];
        changeSong(lastSongIndex, false);
        return prev.slice(0, -1);
      }
      return prev;
    });
  }, [changeSong]);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current && songs.length > 0) {
      await changeSong(currentSong);
      return;
    }

    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  }, [isPlaying, songs.length, changeSong, currentSong]);

  // Key press handlers
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === "ArrowRight" && !e.repeat) {
        e.preventDefault();
        if (isLinearMode) nextLinearSong();
        else nextRandomSong();
      } else if (e.code === "ArrowLeft" && !e.repeat) {
        e.preventDefault();
        previousSong();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    togglePlayPause,
    nextLinearSong,
    nextRandomSong,
    previousSong,
    isLinearMode,
  ]);

  // Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="relative min-h-screen  flex flex-col items-center justify-center">
      <SongDetails
        isBuffering={isBuffering}
        currentSong={currentSong}
        songs={songs}
      />
      <MediaControls
        isPlaying={isPlaying}
        playSong={togglePlayPause}
        pauseSong={togglePlayPause}
        nextSong={isLinearMode ? nextLinearSong : nextRandomSong}
        previousSong={previousSong}
        hasStarted={hasStarted}
      />
    </div>
  );
}
