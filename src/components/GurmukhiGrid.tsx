import React from "react";
import GurmukhiCard from "./GurmukhiCard.tsx";
import { cn } from "../assets/helpers.ts";
import { GURMUKHI_LETTERS } from "../assets/constants.ts";

const GurmukhiGrid: React.FC = () => {
  const [lastPlayed, setLastPlayed] = React.useState<string | null>(null);
  // const [lastPlayed, setLastPlayed] = React.useState<string | null>(GURMUKHI_LETTERS[0].letter);

  return (
    <div className="w-full p-2 sm:p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {GURMUKHI_LETTERS.map((item) => (
            <GurmukhiCard
              key={item.letter}
              {...item}
              className={cn(
                "w-full aspect-square", // Keep cards square
                "min-w-0", // Allow shrinking below content size
                lastPlayed === item.letter && "ring-2 ring-blue-500"
              )}
              onPlay={() => setLastPlayed(item.letter)}
            />
          ))}
        </div>

        {/* Last played indicator */}
        {lastPlayed && (
          <div className="mt-4 md:mt-6 text-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Last played:{" "}
            {GURMUKHI_LETTERS.find((l) => l.letter === lastPlayed)?.transliteration}
          </div>
        )}
      </div>
    </div>
  );
};

export default GurmukhiGrid;
