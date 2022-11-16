"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNextGeneration = exports.initializePlayers = void 0;
const neural_network_1 = require("./neural-network");
const initializePlayers = (numberOfPlayers, numberOfInputs = 2, numberOfHidden = 8, numberOfOutputs = 3) => {
    const players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const brain = (0, neural_network_1.getBrain)(numberOfInputs, numberOfHidden, numberOfOutputs);
        players.push({ brain, fitness: 1 });
    }
    return players;
};
exports.initializePlayers = initializePlayers;
const createNextGeneration = (allPlayers) => {
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
        const mutatedBrain = (0, neural_network_1.mutateBrain)(player.brain, 0.05);
        player.brain = mutatedBrain;
    }
    return newPlayers;
};
exports.createNextGeneration = createNextGeneration;
const generate = (oldPlayers) => {
    const newPlayers = [];
    for (let i = 0; i < oldPlayers.length; i++) {
        const randomSelection = poolSelection(oldPlayers);
        newPlayers.push(randomSelection);
    }
    return newPlayers;
};
const poolSelection = (players) => {
    let index = 0;
    let r = Math.random();
    while (r > 0) {
        r -= players[index].fitness;
        // And move on to the next
        index += 1;
    }
    index -= 1;
    return { ...players[index], brain: (0, neural_network_1.getBrainCopy)(players[index].brain) };
};
