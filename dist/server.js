"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const neural_network_1 = require("./neural-network");
const evolution_1 = require("./evolution");
let players;
const PORT = process.env.PORT || 5551;
const app = (0, express_1.default)();
var Choice;
(function (Choice) {
    Choice[Choice["Rock"] = 0] = "Rock";
    Choice[Choice["Paper"] = 1] = "Paper";
    Choice[Choice["Scissors"] = 2] = "Scissors";
})(Choice || (Choice = {}));
const checkWinner = (player1, player2) => {
    if (player1 === player2) {
        return 0;
    }
    else if ((player1 === Choice.Rock && player2 === Choice.Scissors) ||
        (player1 === Choice.Paper && player2 === Choice.Rock) ||
        (player1 === Choice.Scissors && player2 === Choice.Paper)) {
        return 1;
    }
    else {
        return -1;
    }
};
app.use(express_1.default.json());
app.use(express_1.default.static("./dist"));
app.post("/create-players", (req, res) => {
    const { numberOfPlayers, numberOfHidden } = req.body;
    players = (0, evolution_1.initializePlayers)(numberOfPlayers, 1, numberOfHidden, 3);
    res.send("success");
});
app.post("/train", (req, res) => {
    const { numberOfGenerations } = req.body;
    players = (0, neural_network_1.trainMore)(players, parseInt(numberOfGenerations));
    res.send("success");
});
app.post("/enter-choice", (req, res) => {
    const { choice } = req.body;
    const choiceEnum = parseInt(Choice[choice]);
    console.log("choiceEnum", choiceEnum);
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    console.log("fitness", randomPlayer.fitness);
    const normalizedInput = choiceEnum / 2;
    const output = (0, neural_network_1.predict)(randomPlayer.brain, [normalizedInput]);
    console.log("output is", output);
    const index = output.indexOf(Math.max(...output));
    const computerChoice = Choice[index];
    const winner = checkWinner(choiceEnum, index);
    if (winner === 0) {
        res.send({
            computerChoice,
            winner: "tie",
        });
    }
    else if (winner === 1) {
        res.send({
            computerChoice,
            winner: "player",
        });
    }
    else {
        res.send({
            computerChoice,
            winner: "computer",
        });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
