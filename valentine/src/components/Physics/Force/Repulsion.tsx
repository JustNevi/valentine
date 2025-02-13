import { ChargedParticle } from "../Matter/ChargedParticle";

interface Props {
  static_particle: ChargedParticle;
  particles: ChargedParticle[];
  k?: number;
}

function Repulsion({
  static_particle,
  particles,
  k = -1 / 1000,
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
  ) => k * q1 * q2 * (x2 - x1) * r;

  const sp = static_particle;

  moved_particles.forEach((mp, id) => {
    const r = calc_r(mp.x, sp.x, mp.y, sp.y);
    if (r == 0) {
      return;
    }
    let vel_x = calc_vel(mp.x, sp.x, mp.q, sp.q, r);
    let vel_y = calc_vel(mp.y, sp.y, mp.q, sp.q, r);

    if (vel_x && vel_y) {
      const vel_magnitude = Math.sqrt(vel_x ** 2 + vel_y ** 2);
      if (vel_magnitude > r) {
        moved_particles[id].vel_x = 0;
        moved_particles[id].vel_y = 0;
        moved_particles[id].x = sp.x;
        moved_particles[id].y = sp.y;
      } else {
        moved_particles[id].vel_x = vel_x;
        moved_particles[id].vel_y = vel_y;
      }
    }
  });

  return moved_particles;
}

export default Repulsion;
