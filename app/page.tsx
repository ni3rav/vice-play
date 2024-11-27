import { Player } from "@/components/Player";

function page() {
  const songs = [
    { title: "Awesome 80s Mix", src: "/songs/Billie Jean.mp3" },
    { title: "Synthwave Nights", src: "/public/songs/Blinding Lights.mp3" },
  ];
  return (
    <div className="h-screen w-full flex justify-center items-start">
      <Player
        // isPlaying={isPlaying}
        // playSong={playSong}
        // pauseSong={pauseSong}
        // nextSong={nextSong}
        // previousSong={previousSong}
        // isBuffering={isBuffering}
        // hasStarted={hasStarted}
        // currentSong={currentSongIndex}
        songs={songs}
      />
    </div>
  );
}
export default page;
