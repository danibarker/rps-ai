"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("./mongoose"));
const playerSetSchema = new mongoose_1.default.Schema({
    name: String,
    players: [
        {
            brain: {
                type: String,
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
            fitness: {
                type: Number,
                required: true,
            },
        },
    ],
});
const PlayerSet = mongoose_1.default.model("PlayerSet", playerSetSchema);
const createNewPlayerSet = async (name) => {
    const playerSet = new PlayerSet({
        name,
        players: [],
    });
    await playerSet.save();
};
// const getPlayerSetByName = async (
//   name: string
// ): Promise<{ name: string; players: Player[] } | null> => {
//   const playerSet = await PlayerSet.findOne({ name }).exec();
//   if (!playerSet) {
//     return null;
//   }
//   const players = playerSet.players.map((player) => {
//     const brain = deserializeBrain(player.brain);
//     return { ...player, brain };
//   });
//   return { ...playerSet.toObject(), players };
// };
// const createPlayerSet = async (
//   name: string,
//   players: Player[]
// ): Promise<void> => {
//   const playerSet = new PlayerSet({
//     name,
//     players: players.map((player) => ({
//       ...player,
//       brain: serializeBrain(player.brain),
//     })),
//   });
//   await playerSet.save();
// };
const savePlayerSet = async (name, players) => {
    const playerSet = await PlayerSet.findOne({
        name,
    }).exec();
    if (!playerSet) {
        throw new Error("Player set not found");
    }
    // playerSet.players = players.map((player) => ({
    //   ...player,
    //   brain: serializeBrain(player.brain),
    // }));
    await playerSet.save();
};
// export { getPlayerSetByName, savePlayerSet, createPlayerSet };
