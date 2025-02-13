import { Particle, initParticle } from "./Matter/Particle";
import { ChargedParticle } from "./Matter/ChargedParticle";
// import { Body } from "./Matter/Body";
// import Electric from "./Force/Electric";
// import Gravity from "./Force/Gravity";
import Magnetic from "./Force/Magnetic";

export interface Engine {
  start: () => void;
  run: () => void;
  onClickHandler: (event: MouseEvent) => void;
  onMouseMoveHandler: (event: MouseEvent) => void;
  onMouseDownHandler: (event: MouseEvent) => void;
  onMouseUpHandler: (event: MouseEvent) => void;
}

interface Props {
  endCalculate: (
    particles: Particle[],
    help_particles?: Particle[],
    mouse_pos?: { x: number; y: number; r: number }
  ) => void;
}

function Engine({ endCalculate }: Props): Engine {
  let static_particles: Particle[][];
  let particles: Particle[][];

  let mouse_x: number = 0;
  let mouse_y: number = 0;
  const circleRadius = 50;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  const particleToChargedParticle = (
    particle: Particle,
    q: number = 2
  ): ChargedParticle => {
    return { q: q, ...particle };
  };

  const particlesToArray = (particles: Particle[][]): Particle[] => {
    const array_particles: Particle[] = [];
    particles.forEach((arr) => arr.forEach((p) => array_particles.push(p)));
    return array_particles;
  };

  const moveParticles = () => {
    particles = particles.map((arr) =>
      arr.map((p) => ({
        x: p.x + p.vel_x,
        y: p.y + p.vel_y,
        vel_x: p.vel_x + p.acc_x,
        vel_y: p.vel_y + p.acc_y,
        acc_x: p.acc_x,
        acc_y: p.acc_y,
      }))
    );
  };

  const onClickHandler = (event: MouseEvent) => {
    static_particles[0][0].x = event.clientX;
    static_particles[0][0].y = event.clientY;
  };
  const onMouseMoveHandler = (event: MouseEvent) => {
    mouse_x = event.clientX;
    mouse_y = event.clientY;
  };
  const onMouseDownHandler = (_event: MouseEvent) => {};
  const onMouseUpHandler = (_event: MouseEvent) => {};

  const getPushedAroundStaticParticles = (): Particle[][] => {
    return static_particles.map((arr) =>
      arr.map((p) => {
        const pushed_particle = { ...p };
        if ((p.x - mouse_x) ** 2 + (p.y - mouse_y) ** 2 <= circleRadius ** 2) {
          const v_x = mouse_x - p.x;
          const v_y = mouse_y - p.y;
          const r = Math.sqrt(v_x ** 2 + v_y ** 2);

          const sin = v_y / r;
          const cos = v_x / r;

          pushed_particle.x = mouse_x - cos * circleRadius;
          pushed_particle.y = mouse_y - sin * circleRadius;
        }
        return pushed_particle;
      })
    );
  };

  const start = () => {
    static_particles = [];
    particles = [];

    for (let i = 0; i < 10; i++) {
      static_particles.push([initParticle]);
    }

    for (let i = 0; i < 10; i++) {
      particles.push([initParticle]);
    }

    static_particles = static_particles.map((arr) =>
      arr.map((p) => ({
        x: getRandomInt(window.innerWidth),
        y: getRandomInt(window.innerHeight),
        vel_x: p.vel_x,
        vel_y: p.vel_y,
        acc_x: p.acc_x,
        acc_y: p.acc_y,
      }))
    );

    particles = particles.map((arr) =>
      arr.map((p) => ({
        x: getRandomInt(window.innerWidth),
        y: getRandomInt(window.innerHeight),
        vel_x: p.vel_x,
        vel_y: p.vel_y,
        acc_x: p.acc_x,
        acc_y: p.acc_y,
      }))
    );

    endCalculate(
      particlesToArray(particles),
      particlesToArray(static_particles)
    );
  };

  const run = () => {
    const pushed_static_particles = getPushedAroundStaticParticles();

    // particles = Electric({
    //   static_particles: pushed_static_particles.map((p) =>
    //     particleToChargedParticle(p, -2)
    //   ),
    //   particles: particles.map((p) => particleToChargedParticle(p)),
    // });

    let new_particles: Particle[][] = new Array(particles.length)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < particles.length; i++) {
      let static_array = pushed_static_particles[i];
      let movable_array = particles[i];

      movable_array = Magnetic({
        static_particle: particleToChargedParticle(static_array[0], -2),
        particles: movable_array.map((p) => particleToChargedParticle(p)),
      });

      new_particles[i] = movable_array;
    }

    particles = new_particles;

    moveParticles();

    endCalculate(
      particlesToArray(particles),
      particlesToArray(pushed_static_particles),
      {
        x: mouse_x,
        y: mouse_y,
        r: circleRadius,
      }
    );
  };

  return {
    start,
    run,
    onClickHandler,
    onMouseMoveHandler,
    onMouseDownHandler,
    onMouseUpHandler,
  };
}

export default Engine;
