import { MdGraphicEq } from "react-icons/md";

interface SongDetailsProps {
  isBuffering: boolean;
  currentSong: number;
  songs: { title: string; src: string }[];
}

export const SongDetails: React.FC<SongDetailsProps> = ({
  isBuffering,
  currentSong,
  songs,
}) => {
  return (
    <div className="text-center pb-4">
      <h2 className="text-white text-lg font-thin flex items-center justify-center">
        <MdGraphicEq className="icon-equalizer text-white mr-2" size={24} />
        {isBuffering
          ? "Buffering..."
          : songs[currentSong]?.title
          ? `${songs[currentSong].title}...`
          : "No song selected"}
      </h2>
    </div>
  );
};
