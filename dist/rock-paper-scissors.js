"use strict";
// import { createNextGeneration, initializePlayers } from "./evolution";
// import { Player } from "./types";
// import { predict, trainMore } from "./neural-network";
// const players = initializePlayers(40, 1, 6, 3);
// enum Choice {
//   Rock,
//   Paper,
//   Scissors,
// }
// let newPlayers = trainMore(players, 200);
// const play = () => {
//   let count = 0;
//   while (true) {
//     newPlayers = trainMore(newPlayers, 200);
//     count++;
//     console.log(`trained ${count * 200} times`);
//     const randomPlayer =
//       newPlayers[Math.floor(Math.random() * newPlayers.length)];
//     while (true) {
//       const answer = rl.question(
//         "Rock(0), Paper(1), Scissors(2), or Train More(3)\n"
//       );
//       if (answer === "3") {
//         break;
//       }
//       const normalizedInput1 = parseInt(answer) / 2;
//       const output = predict(randomPlayer.brain, [normalizedInput1]);
//       // get the index of the highest value in the output array
//       const index = output.indexOf(Math.max(...output));
//       console.log(`You chose ${Choice[parseInt(answer)]}`);
//       console.log(`Computer chose : ${Choice[index]}`);
//       if (Choice[index] === Choice[parseInt(answer)]) {
//         console.log("Tie!");
//       } else if (
//         Choice[index] === Choice[0] &&
//         Choice[parseInt(answer)] === Choice[1]
//       ) {
//         console.log("You win!");
//       } else if (
//         Choice[index] === Choice[1] &&
//         Choice[parseInt(answer)] === Choice[2]
//       ) {
//         console.log("You win!");
//       } else if (
//         Choice[index] === Choice[2] &&
//         Choice[parseInt(answer)] === Choice[0]
//       ) {
//         console.log("You win!");
//       } else {
//         console.log("You lose!");
//       }
//     }
//   }
// };
// // play();
// // export { trainMore };
