import { Sequential } from "@tensorflow/tfjs-node";

type Player = {
  brain: Sequential;
  fitness: number;
};
export type { Player, Sequential };
