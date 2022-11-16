import { getBrain, getBrainCopy, mutateBrain } from "./neural-network";
import { Player } from "./types";

const initializePlayers = (
  numberOfPlayers: number,
  numberOfInputs: number = 2,
  numberOfHidden: number = 8,
  numberOfOutputs: number = 3
) => {
  const players: Player[] = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    const brain = getBrain(numberOfInputs, numberOfHidden, numberOfOutputs);
    players.push({ brain, fitness: 1 });
  }
  return players;
};

const createNextGeneration = (allPlayers: Player[]): Player[] => {
  // kill the weakest 50%
  const topHalf = allPlayers.sort((a, b) => b.fitness - a.fitness);
  const fitnesses = topHalf.map((p) => p.fitness);
  const totalFitness = fitnesses.reduce((a, b) => a + b, 0);
  for (let i = 0; i < topHalf.length; i++) {
    const player = topHalf[i];
    player.fitness = player.fitness / totalFitness;
  }
  console.log("totalFitness", totalFitness);
  const newPlayers = generate(topHalf);
  for (let i = 0; i < newPlayers.length; i++) {
    const player = newPlayers[i];
    const mutatedBrain = mutateBrain(player.brain, 0.05);
    player.brain = mutatedBrain;
  }
  return newPlayers;
};

const generate = (oldPlayers: Player[]) => {
  const newPlayers: Player[] = [];
  for (let i = 0; i < oldPlayers.length; i++) {
    const randomSelection = poolSelection(oldPlayers);
    newPlayers.push(randomSelection);
  }
  return newPlayers;
};

const poolSelection = (players: Player[]): Player => {
  let index = 0;

  let r = Math.random();

  while (r > 0) {
    r -= players[index].fitness;
    // And move on to the next
    index += 1;
  }

  index -= 1;

  return { ...players[index], brain: getBrainCopy(players[index].brain) };
};

export { initializePlayers, createNextGeneration, Player };
