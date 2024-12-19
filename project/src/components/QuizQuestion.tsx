import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { questions, finaleQuestion } from '../data/questions';
import clsx from 'clsx';

export const QuizQuestion: React.FC<{ playerId: string }> = ({ playerId }) => {
  const { 
    currentQuestion, 
    isQuestionActive, 
    timeRemaining, 
    players, 
    showResults, 
    isFinale 
  } = useGameStore();
  
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const showResultsScreen = useGameStore((state) => state.showResultsScreen);
  const startFinale = useGameStore((state) => state.startFinale);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const showFinalResults = useGameStore((state) => state.showFinalResults);
  
  const question = isFinale ? finaleQuestion : questions[currentQuestion];
  const currentPlayer = players.find(p => p.id === playerId);
  const isAdmin = currentPlayer?.isAdmin;

  useEffect(() => {
    if (timeRemaining === 0 && isQuestionActive) {
      showResultsScreen();
    }
  }, [timeRemaining, isQuestionActive, showResultsScreen]);

  const handleAnswer = (optionIndex: number) => {
    if (isQuestionActive && currentPlayer?.currentAnswer === undefined) {
      submitAnswer(playerId, optionIndex);
    }
  };

  const handleNextAction = () => {
    if (isFinale) {
      showFinalResults();
    } else if (currentQuestion === questions.length - 1) {
      showFinalResults();
    } else {
      nextQuestion();
    }
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-6">Ergebnisse - {isFinale ? "Finale" : `Frage ${currentQuestion + 1}`}</h2>
        <div className="mb-6">
          <p className="text-lg mb-2">{question.text}</p>
          <p className="text-green-600 font-semibold">
            Richtige Antwort: {question.options[question.correctAnswer]}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Spieler Antworten:</h3>
          {players.map((player) => (
            <div 
              key={player.id}
              className={clsx(
                "p-3 rounded-lg",
                player.currentAnswer === question.correctAnswer
                  ? "bg-green-100"
                  : player.currentAnswer !== undefined
                    ? "bg-red-100"
                    : "bg-gray-100"
              )}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{player.name}</span>
                  <span className="ml-2 text-sm">
                    {player.currentAnswer !== undefined 
                      ? question.options[player.currentAnswer]
                      : "Keine Antwort"}
                  </span>
                </div>
                <span className="font-semibold">
                  +{player.roundPoints || 0} Punkte
                </span>
              </div>
            </div>
          ))}
        </div>

        {isAdmin && (
          <div className="mt-6 flex gap-4">
            {!isFinale && currentQuestion === questions.length - 1 ? (
              <>
                <button
                  onClick={() => startFinale()}
                  className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                >
                  Finale starten
                </button>
                <button
                  onClick={() => showFinalResults()}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Spiel beenden
                </button>
              </>
            ) : (
              <button
                onClick={handleNextAction}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {isFinale ? "Spiel beenden" : "Nächste Frage"}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {isFinale ? "Finale" : `Frage ${currentQuestion + 1}`}
        </h2>
        <span className="text-lg font-semibold text-blue-600">
          Zeit: {timeRemaining}s
        </span>
      </div>
      
      <p className="text-lg mb-6">{question.text}</p>
      
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={!isQuestionActive || currentPlayer?.currentAnswer !== undefined}
            className={clsx(
              "p-4 text-left rounded-lg transition-colors",
              currentPlayer?.currentAnswer === index
                ? "bg-blue-200 border-2 border-blue-500"
                : isQuestionActive && currentPlayer?.currentAnswer === undefined
                ? "hover:bg-blue-100 bg-gray-50"
                : "bg-gray-100 cursor-not-allowed"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};