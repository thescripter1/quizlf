import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { PlayerJoin } from './components/PlayerJoin';
import { QuizQuestion } from './components/QuizQuestion';
import { Scoreboard } from './components/Scoreboard';
import { AdminControls } from './components/AdminControls';
import { FinalResults } from './components/FinalResults';

function App() {
  const { players, isGameStarted, showFinalResults } = useGameStore();
  const currentPlayer = players.find(p => p.name === localStorage.getItem('currentPlayer'));

  useEffect(() => {
    const timer = setInterval(() => {
      const state = useGameStore.getState();
      if (state.isGameStarted && state.isQuestionActive && state.timeRemaining > 0) {
        useGameStore.setState({ timeRemaining: state.timeRemaining - 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Multiplayer Quiz</h1>
        
        <div className="flex gap-8">
          <div className="flex-1">
            <PlayerJoin />
            
            {currentPlayer?.isAdmin && <AdminControls />}
            
            {showFinalResults ? (
              <FinalResults />
            ) : (
              <>
                {isGameStarted && currentPlayer && (
                  <QuizQuestion playerId={currentPlayer.id} />
                )}
                
                {!isGameStarted && players.length > 0 && (
                  <div className="text-center text-lg text-gray-600">
                    Warte auf den Start des Spiels...
                  </div>
                )}
              </>
            )}
          </div>
          
          {!showFinalResults && <Scoreboard />}
        </div>
      </div>
    </div>
  );
}

export default App;