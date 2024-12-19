import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy } from 'lucide-react';

export const FinalResults: React.FC = () => {
  const players = useGameStore((state) => state.players);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  if (!winner) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">Keine Spieler vorhanden</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-auto">
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Spielende!</h2>
        <p className="text-xl text-gray-600">
          Gewinner: <span className="font-bold text-yellow-600">{winner.name}</span>
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl mb-4">Endstand:</h3>
        {sortedPlayers.map((player, index) => (
          <div 
            key={player.id}
            className={`p-4 rounded-lg ${index === 0 ? 'bg-yellow-100' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{index + 1}.</span>
                <span className="font-medium">{player.name}</span>
              </div>
              <span className="font-bold text-lg">{player.score} Punkte</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};