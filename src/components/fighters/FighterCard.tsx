import type { Fighter } from '@/types/mma'; // Import as type only

interface FighterCardProps {
  fighter: Fighter;
}

export default function FighterCard({ fighter }: FighterCardProps) {
  const { FirstName, LastName, Nickname, WeightClass, Wins, Losses, Draws, CareerStats } = fighter;

  const displayName = Nickname ? `${FirstName} "${Nickname}" ${LastName}` : `${FirstName} ${LastName}`;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white truncate" title={displayName}>
          {displayName}
        </h2>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span className="font-medium">Class:</span> {WeightClass || "N/A"}
        </p>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="font-medium">Record:</span> {Wins ?? 0} - {Losses ?? 0} - {Draws ?? 0}
        </p>
      </div>

      {CareerStats && (
        <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h3 className="text-sm md:text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Key Stats:</h3>
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <li>
              <span className="font-medium">Sig. Str/Min:</span> {CareerStats.SigStrikesLandedPerMinute?.toFixed(2) ?? "N/A"}
            </li>
            <li>
              <span className="font-medium">TD Avg:</span> {CareerStats.TakedownAverage?.toFixed(2) ?? "N/A"}
            </li>
            <li>
              <span className="font-medium">KO %:</span> {CareerStats.KnockoutPercentage?.toFixed(1) ?? "N/A"}%
            </li>
          </ul>
        </div>
      )}
      {/* 
      <div className="mt-4">
        <a href={`/fighters/${fighter.FighterId}`} 
           className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View Full Profile
        </a>
      </div>
      */}
    </div>
  );
} 
