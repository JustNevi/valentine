import { Particle } from "./Particle";

export interface ChargedParticle extends Particle {
  q: number;
}
