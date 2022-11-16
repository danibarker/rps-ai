// import { createNextGeneration, initializePlayers, Player } from "./evolution";

// import { predict } from "./neural-network";
// import rl from "readline-sync";

// const renderBoard = (board: number[]) => {
//   // draw as a 3x3 grid
//   let output = "";
//   for (let i = 0; i < board.length; i++) {
//     if (i % 3 === 0) {
//       output += "\n";
//     }
//     if (board[i] === 0) {
//       output += " ";
//     } else if (board[i] === 1) {
//       output += "O";
//     } else {
//       output += "X";
//     }
//   }
//   console.log(output);
// };
// const checkWinner = (board: number[]): number => {
//   const winningCombinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < winningCombinations.length; i++) {
//     const [a, b, c] = winningCombinations[i];
//     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//       return board[a];
//     }
//   }
//   return 0;
// };

// const playTicTacToe = (player1: Player, player2: Player) => {
//   const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//   let turn = 0;
//   let winner = 0;
//   while (winner === 0) {
//     renderBoard(board);
//     const player = turn % 2 === 0 ? player1 : player2;
//     const answer = predict(player.brain, board);
//     const index = answer.indexOf(Math.max(...answer));
//     if (board[index] === 0) {
//       board[index] = turn % 2 === 0 ? 1 : -1;
//       turn++;
//     } else {
//       return turn % 2 === 0 ? -2 : 2;
//     }
//     winner = checkWinner(board);
//   }
//   return winner;
// };
// // Tic Tac Toe
// const players = initializePlayers(4000, 9, 120, 9);
// // create groups of 2 players
// // play a game between each pair
// const teams = [];
// for (let i = 0; i < players.length; i += 2) {
//   const player1 = players[i];
//   const player2 = players[i + 1];
//   teams.push([player1, player2]);
// }
// // play a game between each pair
// for (let [player1, player2] of teams) {
//   const winner = playTicTacToe(player1, player2);
//   if (winner === -2) {
//     console.log("player 2 failed to choose a valid move");
//     player2.fitness -= 500;
//   }
//   if (winner === 2) {
//     console.log("player 1 failed to choose a valid move");
//     player1.fitness -= 500;
//   }
//   if (winner === 1) {
//     console.log("player 1 won");
//     player1.fitness += 1;
//     player2.fitness -= 1;
//   }
//   if (winner === -1) {
//     console.log("player 2 won");
//     player2.fitness += 1;
//     player1.fitness -= 1;
//   }
//   if (winner === 0) {
//     console.log("it's a tie");
//     player1.fitness += 0.5;
//     player2.fitness += 0.5;
//   }
// }

// // calculate the total fitness of the population
// let newPlayers = createNextGeneration(players);

// const play = () => {
//   let count = 0;
//   while (true) {
//     for (let i = 0; i < 200; i++) {
//       const teams = [];
//       for (let i = 0; i < newPlayers.length; i += 2) {
//         const player1 = newPlayers[i];
//         const player2 = newPlayers[i + 1];
//         teams.push([player1, player2]);
//       }
//       // play a game between each pair
//       for (let [player1, player2] of teams) {
//         const winner = playTicTacToe(player1, player2);
//         if (winner === -2) {
//           console.log("player 2 failed to choose a valid move");
//           player2.fitness -= 5;
//         }
//         if (winner === 2) {
//           console.log("player 1 failed to choose a valid move");
//           player1.fitness -= 5;
//         }

//         if (winner === 1) {
//           player1.fitness += 1;
//         }
//         if (winner === -1) {
//           player2.fitness += 1;
//         }
//         if (winner === 0) {
//           player1.fitness += 0.5;
//           player2.fitness += 0.5;
//         }
//       }

//       newPlayers = createNextGeneration(newPlayers);
//     }
//     count++;
//     console.log(`trained ${count * 20} times`);
//     const randomPlayer =
//       newPlayers[Math.floor(Math.random() * newPlayers.length)];

//     while (true) {
//       const answer = rl.question("Play against the AI? (y/n) ");
//       if (answer === "y") {
//         const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//         let turn = 0;
//         let winner = 0;
//         while (winner === 0) {
//           renderBoard(board);
//           const player = turn % 2 === 0 ? randomPlayer : "player 2";
//           if (player === randomPlayer) {
//             const answer = predict(player.brain, board);
//             const index = answer.indexOf(Math.max(...answer));
//             if (board[index] === 0) {
//               board[index] = turn % 2 === 0 ? 1 : -1;
//               turn++;
//             }
//           } else {
//             const answer = rl.question("Enter a number between 0 and 8: ");
//             if (board[+answer] === 0) {
//               board[+answer] = turn % 2 === 0 ? 1 : -1;
//               turn++;
//             }
//           }

//           winner = checkWinner(board);
//         }
//         if (winner === 1) {
//           console.log("You won!");
//         }
//         if (winner === -1) {
//           console.log("You lost!");
//         }
//         if (winner === 0) {
//           console.log("It's a tie!");
//         }
//       } else {
//         break;
//       }
//     }
//   }
// };
// play();
