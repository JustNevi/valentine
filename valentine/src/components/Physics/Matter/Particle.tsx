export interface Particle {
  x: number;
  y: number;
  vel_x: number;
  vel_y: number;
  acc_x: number;
  acc_y: number;
}

export const initParticle: Particle = {
  x: 0,
  y: 0,
  vel_x: 0,
  vel_y: 0,
  acc_x: 0,
  acc_y: 0,
};
