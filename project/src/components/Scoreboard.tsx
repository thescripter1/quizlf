import React from 'react';
import { useGameStore } from '../store/gameStore';

export const Scoreboard: React.FC = () => {
  const players = useGameStore((state) => state.players);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h2 className="text-xl font-bold mb-4 text-center">Scoreboard</h2>
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{index + 1}.</span>
              <span>{player.name}</span>
              {player.isAdmin && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  Admin
                </span>
              )}
            </div>
            <span className="font-bold">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};