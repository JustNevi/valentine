import { ChargedParticle } from "../Matter/ChargedParticle";

interface Props {
  static_particles: ChargedParticle[];
  particles: ChargedParticle[];
  k?: number;
}

function Electric({
  static_particles,
  particles,
  k = -0.15,
}: Props): ChargedParticle[] {
  const moved_particles: ChargedParticle[] = [...particles];

  const calc_r = (x1: number, x2: number, y1: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const calc_vel = (
    x1: number,
    x2: number,
    q1: number,
    q2: number,
    r: number
  ) => (k * q1 * q2 * (x2 - x1)) / r ** 2;

  static_particles.forEach((sp) => {
    moved_particles.forEach((mp, id) => {
      const r = calc_r(mp.x, sp.x, mp.y, sp.y);
      let vel_x = calc_vel(mp.x, sp.x, mp.q, sp.q, r);
      let vel_y = calc_vel(mp.y, sp.y, mp.q, sp.q, r);

      moved_particles[id].vel_x = moved_particles[id].vel_x + vel_x;
      moved_particles[id].vel_y = moved_particles[id].vel_y + vel_y;
    });
  });

  return moved_particles;
}

export default Electric;
