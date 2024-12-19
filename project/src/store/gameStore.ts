import { create } from 'zustand';
import { questions, finaleQuestion } from '../data/questions';
import type { GameState, Player } from '../types/quiz';
import { calculatePoints } from '../utils/points';

interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  startGame: () => void;
  nextQuestion: () => void;
  submitAnswer: (playerId: string, answer: number) => void;
  resetGame: () => void;
  showResultsScreen: () => void;
  startFinale: () => void;
  showFinalResults: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  currentQuestion: 0,
  isGameStarted: false,
  isQuestionActive: false,
  timeRemaining: 15,
  showResults: false,
  isFinale: false,
  showFinalResults: false,

  addPlayer: (name: string) => {
    const isAdmin = name === 'FinCreeper1';
    const newPlayer = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      score: 0,
      isAdmin,
      currentAnswer: undefined,
      roundPoints: 0
    };
    
    set((state) => ({
      players: [...state.players, newPlayer]
    }));
  },

  removePlayer: (id: string) => {
    set((state) => ({
      players: state.players.filter(player => player.id !== id)
    }));
  },

  startGame: () => {
    set({ 
      isGameStarted: true, 
      isQuestionActive: true, 
      timeRemaining: 15,
      showResults: false,
      isFinale: false,
      showFinalResults: false,
      currentQuestion: 0,
      players: get().players.map(player => ({
        ...player,
        currentAnswer: undefined,
        roundPoints: 0
      }))
    });
  },

  nextQuestion: () => {
    const currentQuestion = get().currentQuestion;
    if (currentQuestion < questions.length - 1) {
      set((state) => ({
        currentQuestion: state.currentQuestion + 1,
        isQuestionActive: true,
        timeRemaining: 15,
        showResults: false,
        players: state.players.map(player => ({
          ...player,
          currentAnswer: undefined,
          roundPoints: 0
        }))
      }));
    }
  },

  submitAnswer: (playerId: string, answer: number) => {
    const { currentQuestion, timeRemaining, isFinale } = get();
    const currentQ = isFinale ? finaleQuestion : questions[currentQuestion];
    const isCorrect = answer === currentQ.correctAnswer;
    const points = isCorrect ? calculatePoints(timeRemaining, isFinale) : 0;

    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId
          ? { 
              ...player, 
              currentAnswer: answer,
              roundPoints: points
            }
          : player
      )
    }));
  },

  showResultsScreen: () => {
    set((state) => ({
      isQuestionActive: false,
      showResults: true,
      timeRemaining: 0,
      players: state.players.map((player) => ({
        ...player,
        score: player.score + (player.roundPoints || 0)
      }))
    }));
  },

  startFinale: () => {
    set({
      isGameStarted: true,
      isQuestionActive: true,
      timeRemaining: 15,
      showResults: false,
      isFinale: true,
      showFinalResults: false,
      players: get().players.map(player => ({
        ...player,
        currentAnswer: undefined,
        roundPoints: 0
      }))
    });
  },

  resetGame: () => {
    set((state) => ({
      currentQuestion: 0,
      isGameStarted: false,
      isQuestionActive: false,
      timeRemaining: 15,
      showResults: false,
      isFinale: false,
      showFinalResults: false,
      players: state.players.map(player => ({
        ...player,
        score: 0,
        currentAnswer: undefined,
        roundPoints: 0
      }))
    }));
  },

  showFinalResults: () => {
    set({
      isGameStarted: false,
      showResults: false,
      isFinale: false,
      showFinalResults: true
    });
  }
}));