import { SaveResult } from "@tensorflow/tfjs-core/dist/io/types";
import * as tf from "@tensorflow/tfjs-node";
import { createNextGeneration } from "./evolution";
import { Player, Sequential } from "./types";

const predict = (brain: Sequential, inputs: number[]) => {
  const xs = tf.tensor2d([inputs]);
  const ys = brain.predict(xs) as tf.Tensor;
  const outputs = ys.dataSync();
  return outputs;
};

const getBrain = (
  numberOfInputs: number,
  numberOfHidden: number,
  numberOfOutputs: number
): Sequential => {
  const brain = tf.sequential();
  const hidden = tf.layers.dense({
    units: numberOfHidden,
    inputShape: [numberOfInputs],
    activation: "sigmoid",
  });
  const output = tf.layers.dense({
    units: numberOfOutputs,
    activation: "softmax",
  });
  brain.add(hidden);
  brain.add(output);
  return brain;
};

const getBrainCopy = (brain: Sequential) => {
  const brainCopy = tf.sequential();
  for (let i = 0; i < brain.layers.length; i++) {
    const layer = brain.layers[i];
    const weights = layer.getWeights();
    const newWeights = weights.map((w) => {
      return tf.clone(w);
    });
    if (i === 0) {
      brainCopy.add(
        tf.layers.dense({
          units: newWeights[1].shape[0],
          inputShape: [newWeights[0].shape[0]],
          activation: "sigmoid",
        })
      );
    } else {
      brainCopy.add(
        tf.layers.dense({
          units: newWeights[1].shape[0],
          activation: "softmax",
        })
      );
    }
    brainCopy.layers[i].setWeights(newWeights);
  }

  return brainCopy;
};

const mutateBrain = (brain: Sequential, mutationRate: number) => {
  const brainCopy = getBrainCopy(brain);

  for (let i = 0; i < brainCopy.layers.length; i++) {
    const layer = brainCopy.layers[i];
    const weights = layer.getWeights();
    const newWeights = weights.map((w) => {
      const { shape } = w;
      const values = w.dataSync().slice();
      for (let j = 0; j < values.length; j++) {
        if (Math.random() < mutationRate) {
          const w = values[j];
          values[j] = w + randomGaussian() * 0.5;
        }
      }
      return tf.tensor(values, shape);
    });
    layer.setWeights(newWeights);
  }
  return brainCopy;
};

const randomGaussian = (): number => {
  let x1: number;
  let x2: number;
  let rad: number;
  do {
    x1 = 2 * Math.random() - 1;
    x2 = 2 * Math.random() - 1;
    rad = x1 * x1 + x2 * x2;
  } while (rad >= 1 || rad === 0);
  const c = Math.sqrt((-2 * Math.log(rad)) / rad);
  return x1 * c;
};

const inputs = [0, 1, 2];
// rock paper scissors
const answers = [1, 2, 0];

const trainMore = (players: Player[], numberOfRounds: number): Player[] => {
  console.log("hey", numberOfRounds);
  let newPlayers = createNextGeneration(players);
  newPlayers = newPlayers.map((player) => {
    return {
      ...player,
      fitness: 0,
    };
  });
  for (let i = 0; i < numberOfRounds; i++) {
    newPlayers.forEach((player) => {
      const randomInput1 = inputs[Math.floor(Math.random() * inputs.length)];
      const normalizedInput1 = randomInput1 / 2;
      const output = predict(player.brain, [normalizedInput1]);
      const correctAnswer = answers[randomInput1];

      player.fitness += output[correctAnswer];
    });
    console.log("newPlayers", newPlayers.length);
    newPlayers = createNextGeneration(newPlayers);
  }
  return newPlayers;
};

export { predict, getBrain, getBrainCopy, mutateBrain, trainMore };
