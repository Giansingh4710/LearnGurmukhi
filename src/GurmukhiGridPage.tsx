import React from "react";
import GurmukhiCard from "./components/GurmukhiCard.tsx";
import { cn } from "./utils/helpers.ts";
import { GURMUKHI_LETTERS } from "./utils/constants.ts";

const GurmukhiGrid: React.FC = () => {
  const [lastPlayed, setLastPlayed] = React.useState<GurmukhiLetter | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                  lastPlayed === item.letter && "ring-2 ring-blue-500",
                )}
                onPlay={() => setLastPlayed(item)}
              />
            ))}
          </div>

          {/* Last played indicator */}
          {lastPlayed && (
            <div className="mt-4 md:mt-6 text-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Last played:{" "}
              {
                GURMUKHI_LETTERS.find((l) => l.letter === lastPlayed.letter)
                  ?.transliteration
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GurmukhiGrid;
