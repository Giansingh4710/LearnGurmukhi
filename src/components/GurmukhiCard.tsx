import React from "react";
import { Volume2, VolumeX, Loader2, Info } from "lucide-react"; // Import icons from lucide-react
import { cn } from "../utils/helpers.ts";

interface GurmukhiCardProps {
  letter: string;
  audioSrc: string;
  transliteration: string;
  className?: string;
  onPlay?: () => void;
}

const GurmukhiCard: React.FC<GurmukhiCardProps> = ({
  letter,
  audioSrc,
  transliteration,
  className,
  onPlay,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [error, setError] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playSound = async () => {
    if (audioRef.current && !error && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      } catch (err) {
        setError(true);
      }
    }
  };

  const cardClasses = cn(
    "relative overflow-hidden transition-all duration-300",
    "rounded-lg border border-gray-200 dark:border-gray-700",
    "hover:shadow-lg hover:scale-105",
    "bg-gradient-to-br from-white to-gray-50",
    "dark:from-gray-900 dark:to-gray-800",
    "w-full aspect-square",
    className,
  );

  return (
    <div className={cardClasses}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setError(true);
        }}
      />
      <button
        onClick={playSound}
        className="w-full h-full focus:ring-4 focus:ring-blue-500 rounded-2xl"
        disabled={error}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {/* Letter with floating animation */}
          <span
            className={cn(
              "text-5xl font-bold text-gray-900 dark:text-white",
              "transition-all duration-500 transform",
              isPlaying ? "scale-110 animate-bounce" : "hover:scale-110",
            )}
          >
            {letter}
          </span>

          {/* Transliteration with fade animation */}
          <div className="h-4 flex items-center justify-center max-sm:hidden">
            {error ? (
              <VolumeX className="w-5 h-5 text-red-500" />
            ) : (
              <Volume2
                className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isPlaying ? "text-blue-500" : "text-gray-400",
                )}
              />
            )}
            <span className="text-sm px-2 font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-300">
              {transliteration}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default GurmukhiCard;
