import express from "express";
import { config } from "dotenv";
import { Player } from "./types";
config();

import { predict, trainMore } from "./neural-network";
import { initializePlayers } from "./evolution";
let players: Player[];
const PORT = process.env.PORT || 5551;
const app = express();
enum Choice {
  Rock,
  Paper,
  Scissors,
}
const checkWinner = (player1: number, player2: number): number => {
  if (player1 === player2) {
    return 0;
  } else if (
    (player1 === Choice.Rock && player2 === Choice.Scissors) ||
    (player1 === Choice.Paper && player2 === Choice.Rock) ||
    (player1 === Choice.Scissors && player2 === Choice.Paper)
  ) {
    return 1;
  } else {
    return -1;
  }
};
app.use(express.json());
app.use(express.static("./dist"));
app.post("/create-players", (req, res) => {
  const { numberOfPlayers, numberOfHidden } = req.body;
  players = initializePlayers(numberOfPlayers, 1, numberOfHidden, 3);
  res.send("success");
});
app.post("/train", (req, res) => {
  const { numberOfGenerations } = req.body;
  players = trainMore(players, parseInt(numberOfGenerations));
  res.send("success");
});
app.post("/enter-choice", (req, res) => {
  const { choice } = req.body;
  const choiceEnum = parseInt(Choice[choice]);
  console.log("choiceEnum", choiceEnum);
  const randomPlayer = players[Math.floor(Math.random() * players.length)];
  console.log("fitness", randomPlayer.fitness);
  const normalizedInput = choiceEnum / 2;
  const output = predict(randomPlayer.brain, [normalizedInput]);
  console.log("output is", output);
  const index = output.indexOf(Math.max(...output));
  const computerChoice = Choice[index];
  const winner = checkWinner(choiceEnum, index);
  if (winner === 0) {
    res.send({
      computerChoice,
      winner: "tie",
    });
  } else if (winner === 1) {
    res.send({
      computerChoice,
      winner: "player",
    });
  } else {
    res.send({
      computerChoice,
      winner: "computer",
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
