import React from "react";
import { Volume2, VolumeX, Loader2, Info } from "lucide-react"; // Import icons from lucide-react
import { cn } from "../assets/helpers.ts";

interface GurmukhiCardProps {
  letter: string;
  audioSrc: string;
  transliteration: string;
  description?: string;
  className?: string;
  onPlay?: () => void;
}

const GurmukhiCard: React.FC<GurmukhiCardProps> = ({
  letter,
  audioSrc,
  transliteration,
  description,
  className,
  onPlay,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playSound = async () => {
    if (audioRef.current && !error && !isPlaying) {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  // Animation variants based on state
  const cardClasses = cn(
    "relative overflow-hidden transition-all duration-300",
    "rounded-lg border border-gray-200 dark:border-gray-700",
    "hover:shadow-lg hover:scale-105",
    "bg-gradient-to-br from-white to-gray-50",
    "dark:from-gray-900 dark:to-gray-800",
    "w-full aspect-square",
    isPlaying && "animate-pulse",
    className
  );

  return (
    <div className={cardClasses}>
      <button
        onClick={playSound}
        className="w-full h-full p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        disabled={error || isLoading}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {/* Letter with floating animation */}
          <span
            className={cn(
              "text-6xl font-bold text-gray-900 dark:text-white",
              "transition-all duration-500 transform",
              isPlaying ? "scale-110 animate-bounce" : "hover:scale-110"
            )}
          >
            {letter}
          </span>

          {/* Transliteration with fade animation */}
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-300">
            {transliteration}
          </span>

          {/* Status indicators */}
          <div className="h-6 flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            ) : error ? (
              <VolumeX className="w-5 h-5 text-red-500" />
            ) : (
              <Volume2
                className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isPlaying ? "text-blue-500" : "text-gray-400"
                )}
              />
            )}
          </div>
        </div>
      </button>

      {/* Info button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowInfo(!showInfo);
        }}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      {/* Info overlay */}
      {showInfo && (
        <div
          className="absolute inset-0 bg-black/80 text-white p-4 flex items-center justify-center text-center"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        >
          {description}
        </div>
      )}

      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleAudioEnd}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default GurmukhiCard;
