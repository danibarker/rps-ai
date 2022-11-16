"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainMore = exports.mutateBrain = exports.getBrainCopy = exports.getBrain = exports.predict = void 0;
const tf = __importStar(require("@tensorflow/tfjs-node"));
const evolution_1 = require("./evolution");
const predict = (brain, inputs) => {
    const xs = tf.tensor2d([inputs]);
    const ys = brain.predict(xs);
    const outputs = ys.dataSync();
    return outputs;
};
exports.predict = predict;
const getBrain = (numberOfInputs, numberOfHidden, numberOfOutputs) => {
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
exports.getBrain = getBrain;
const getBrainCopy = (brain) => {
    const brainCopy = tf.sequential();
    for (let i = 0; i < brain.layers.length; i++) {
        const layer = brain.layers[i];
        const weights = layer.getWeights();
        const newWeights = weights.map((w) => {
            return tf.clone(w);
        });
        if (i === 0) {
            brainCopy.add(tf.layers.dense({
                units: newWeights[1].shape[0],
                inputShape: [newWeights[0].shape[0]],
                activation: "sigmoid",
            }));
        }
        else {
            brainCopy.add(tf.layers.dense({
                units: newWeights[1].shape[0],
                activation: "softmax",
            }));
        }
        brainCopy.layers[i].setWeights(newWeights);
    }
    return brainCopy;
};
exports.getBrainCopy = getBrainCopy;
const mutateBrain = (brain, mutationRate) => {
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
exports.mutateBrain = mutateBrain;
const randomGaussian = () => {
    let x1;
    let x2;
    let rad;
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
const trainMore = (players, numberOfRounds) => {
    console.log("hey", numberOfRounds);
    let newPlayers = (0, evolution_1.createNextGeneration)(players);
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
        newPlayers = (0, evolution_1.createNextGeneration)(newPlayers);
    }
    return newPlayers;
};
exports.trainMore = trainMore;
