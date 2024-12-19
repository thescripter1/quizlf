export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  isAdmin: boolean;
  currentAnswer?: number;
  roundPoints?: number;
}

export interface GameState {
  players: Player[];
  currentQuestion: number;
  isGameStarted: boolean;
  isQuestionActive: boolean;
  timeRemaining: number;
  showResults: boolean;
  isFinale: boolean;
  showFinalResults: boolean;
}