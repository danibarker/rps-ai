"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Choice;
(function (Choice) {
    Choice[Choice["Rock"] = 0] = "Rock";
    Choice[Choice["Paper"] = 1] = "Paper";
    Choice[Choice["Scissors"] = 2] = "Scissors";
})(Choice || (Choice = {}));
// const trainPlayers = async (req: Request, res: Response) => {
//   const name = req.params.name;
//   const numberOfRounds = req.body.numberOfRounds;
//   const playerSet = await getPlayerSetByName(name);
//   if (!playerSet) {
//     res.status(404).send("Player set not found");
//     return;
//   }
//   console.log("Training players for", name);
//   const newPlayers = trainMore(playerSet.players, numberOfRounds);
//   await savePlayerSet(name, newPlayers);
//   res.send("ok");
// };
// const getResult = async (req: Request, res: Response) => {
//   const name = req.params.name;
//   const guess = req.body.guess;
//   const playerSet = await getPlayerSetByName(name);
//   if (!playerSet) {
//     res.status(404).send("Player set not found");
//     return;
//   }
//   const randomPlayer =
//     playerSet.players[Math.floor(Math.random() * playerSet.players.length)];
//   const normalizedInput1 = parseInt(Choice[guess]) / 2;
//   const output = predict(randomPlayer.brain, [normalizedInput1]);
//   const index = output.indexOf(Math.max(...output));
//   console.log(`You chose ${Choice[parseInt(guess)]}`);
//   console.log(`Computer chose : ${Choice[index]}`);
//   if (Choice[index] === Choice[parseInt(guess)]) {
//     res.send("Tie!");
//   }
//   if (Choice[index] === Choice[0] && Choice[parseInt(guess)] === Choice[1]) {
//     res.send("You win!");
//   }
//   if (Choice[index] === Choice[1] && Choice[parseInt(guess)] === Choice[2]) {
//     res.send("You win!");
//   }
//   if (Choice[index] === Choice[2] && Choice[parseInt(guess)] === Choice[0]) {
//     res.send("You win!");
//   }
//   res.send("You lose!");
// };
// const createNewPlayerSet = async (req: Request, res: Response) => {
//   // const name = req.params.name;
//   const {
//     populationSize,
//     numberOfInputs,
//     numberOfOutputs,
//     numberOfHidden,
//     name,
//   } = req.body;
//   const playerSet = await getPlayerSetByName(name);
//   if (playerSet) {
//     res.status(400).send("Player set already exists");
//     return;
//   }
//   await createPlayerSet(
//     name,
//     initializePlayers(
//       populationSize,
//       numberOfInputs,
//       numberOfHidden,
//       numberOfOutputs
//     )
//   );
//   res.send("ok");
// };
// export { trainPlayers, getResult, createNewPlayerSet };
