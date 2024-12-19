import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export const AdminControls: React.FC = () => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { isGameStarted, isFinale } = useGameStore();
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  const handleReset = () => {
    if (showResetConfirm) {
      resetGame();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      // Reset the confirmation state after 3 seconds
      setTimeout(() => {
        setShowResetConfirm(false);
      }, 3000);
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      {!isGameStarted && !isFinale && (
        <button
          onClick={startGame}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Play size={20} />
          Spiel starten
        </button>
      )}
      
      <button
        onClick={handleReset}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          showResetConfirm
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
      >
        <RefreshCw size={20} />
        {showResetConfirm ? "Wirklich zurücksetzen?" : "Spiel zurücksetzen"}
      </button>
    </div>
  );
};