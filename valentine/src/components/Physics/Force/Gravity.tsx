import { Body } from "../Matter/Body";

interface Props {
  static_bodies: Body[];
  bodies: Body[];
  g?: number;
}

function Gravity({ static_bodies, bodies, g = 9.8 }: Props): Body[] {
  const moved_bodies: Body[] = [...bodies];

  const calc_r = (x1: number, x2: number, y1: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const calc_force = (m1: number, m2: number, r: number) =>
    (g * (m1 * m2)) / r ** 2;
  const calc_vel = (f: number, x1: number, x2: number, r: number) =>
    ((x2 - x1) / r) * f;

  static_bodies.forEach((sb) => {
    moved_bodies.forEach((mb, id) => {
      const r = calc_r(mb.x, sb.x, mb.y, sb.y);
      const f = calc_force(mb.m, sb.m, r);
      let vel_x = calc_vel(f, mb.x, sb.x, r);
      let vel_y = calc_vel(f, mb.y, sb.y, r);

      const vel_magnitude = Math.sqrt(vel_x ** 2 + vel_y ** 2);
      if (vel_magnitude > r) {
        vel_x = (vel_x / vel_magnitude) * r;
        vel_y = (vel_y / vel_magnitude) * r;
      }

      moved_bodies[id].vel_x = moved_bodies[id].vel_x + vel_x;
      moved_bodies[id].vel_y = moved_bodies[id].vel_y + vel_y;
    });
  });

  return moved_bodies;
}

export default Gravity;
