export const calculatePoints = (timeRemaining: number, isFinale: boolean): number => {
  // Base points: 0-10 based on remaining time
  const basePoints = Math.ceil((timeRemaining / 15) * 10);
  
  // Double points in finale
  return isFinale ? basePoints * 2 : basePoints;
};