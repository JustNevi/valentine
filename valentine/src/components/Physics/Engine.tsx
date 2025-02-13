import { Particle, initParticle } from "./Matter/Particle";
import { ChargedParticle } from "./Matter/ChargedParticle";
// import { Body } from "./Matter/Body";

// import Gravity from "./Force/Gravity";
//import Magnetic from "./Force/Magnetic";
import Electric from "./Force/Electric";
import Repulsion from "./Force/Repulsion";

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
    particles_heart: Particle[],
    particles_photons: Particle[],
    help_particles?: Particle[],
    mouse_pos?: { x: number; y: number; r: number }
  ) => void;
}

function Engine({ endCalculate }: Props): Engine {
  let static_particles_photons: Particle[][];
  let particles_photons: Particle[][];
  let static_particles_heart: Particle[][];
  let particles_heart: Particle[][];
  let static_particles_falling: Particle[][];
  let particles_falling: Particle[][];

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

  const particlesToArray = (
    particles: Particle[][],
    filter: boolean = false
  ): Particle[] => {
    const array_particles: Particle[] = [];
    particles.forEach((arr) =>
      arr.forEach((p) => {
        if (filter) {
          if (!isPointInHeart(p.x, p.y)) {
            array_particles.push(p);
          }
        } else {
          array_particles.push(p);
        }
      })
    );
    return array_particles;
  };

  const moveParticles = (particles: Particle[][]): Particle[][] => {
    return particles.map((arr) =>
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

  const onClickHandler = (_event: MouseEvent) => {};
  const onMouseMoveHandler = (event: MouseEvent) => {
    mouse_x = event.clientX;
    mouse_y = event.clientY;
  };
  const onMouseDownHandler = (_event: MouseEvent) => {};
  const onMouseUpHandler = (_event: MouseEvent) => {};

  const getPushedAroundStaticParticlesHeart = (): Particle[][] => {
    return static_particles_heart.map((arr) =>
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

  const isPointInHeart = (x: number, y: number): boolean => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + 50;

    const heartSize = 200;
    const X = (x - centerX) / -heartSize;
    const Y = (y - centerY) / -heartSize;
    return (
      (Math.pow(X, 2) + Math.pow(Y, 2) - 1) ** 3 <=
      2 * Math.pow(X, 2) * Math.pow(Y, 3)
    );
  };

  const initHeartParticles = () => {
    static_particles_heart = [];
    particles_heart = [];

    for (let x = 0; x < window.innerWidth; x += 10) {
      for (let y = 0; y < window.innerWidth; y += 10) {
        const randomX = getRandomInt(10);
        const randomY = getRandomInt(10);

        const X = x - randomX;
        const Y = y - randomY;

        if (isPointInHeart(X, Y)) {
          const par = { ...initParticle };
          par.x = X;
          par.y = Y;
          static_particles_heart.push([par]);
        }
      }
    }

    for (let i = 0; i < static_particles_heart.length; i++) {
      particles_heart.push([initParticle]);
    }

    particles_heart = particles_heart.map((arr) =>
      arr.map((p) => ({
        x: getRandomInt(window.innerWidth),
        y: getRandomInt(window.innerHeight),
        vel_x: p.vel_x,
        vel_y: p.vel_y,
        acc_x: p.acc_x,
        acc_y: p.acc_y,
      }))
    );
  };

  const initPhotonParticles = () => {
    static_particles_photons = [];
    particles_photons = [];

    let static_particles_photons_arr: Particle[] = [];
    let particles_photons_arr: Particle[] = [];

    const size = 100;

    for (let i = 0; i < size; i++) {
      static_particles_photons_arr.push(initParticle);
    }

    for (let i = 0; i < size; i++) {
      particles_photons_arr.push(initParticle);
    }

    static_particles_photons.push(static_particles_photons_arr);
    particles_photons.push(particles_photons_arr);

    static_particles_photons = static_particles_photons.map((arr) =>
      arr.map((p) => ({
        x: getRandomInt(window.innerWidth),
        y: getRandomInt(window.innerHeight),
        vel_x: p.vel_x,
        vel_y: p.vel_y,
        acc_x: p.acc_x,
        acc_y: p.acc_y,
      }))
    );

    particles_photons = particles_photons.map((arr) =>
      arr.map((p) => ({
        x: getRandomInt(window.innerWidth),
        y: getRandomInt(window.innerHeight),
        vel_x: p.vel_x,
        vel_y: p.vel_y,
        acc_x: p.acc_x,
        acc_y: p.acc_y,
      }))
    );
  };

  const initFallingParticles = () => {
    static_particles_falling = [];
    particles_falling = [];

    const size = 50;

    for (let i = 0; i < size; i++) {
      let heart_particle =
        static_particles_heart[
          getRandomInt(static_particles_heart.length - 1)
        ][0];
      heart_particle.y = window.innerWidth;
      static_particles_falling.push([heart_particle]);
    }

    for (let i = 0; i < size; i++) {
      let heart_particle =
        static_particles_heart[
          getRandomInt(static_particles_heart.length - 1)
        ][0];
      particles_falling.push([heart_particle]);
    }
  };

  const start = () => {
    initHeartParticles();
    initPhotonParticles();
    initFallingParticles();

    endCalculate(
      particlesToArray(particles_heart),
      particlesToArray(static_particles_heart)
    );
  };

  const processHeart = () => {
    const pushed_static_particles = getPushedAroundStaticParticlesHeart();

    let moved_particles: Particle[][] = new Array(particles_heart.length)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < pushed_static_particles.length; i++) {
      let static_array = pushed_static_particles[i];
      let movable_array = particles_heart[i];

      movable_array = Repulsion({
        static_particle: particleToChargedParticle(static_array[0], -2),
        particles: movable_array.map((p) => particleToChargedParticle(p)),
      });

      moved_particles[i] = movable_array;
    }

    particles_heart = moveParticles(moved_particles);
  };

  const processPhotons = () => {
    let moved_particles: Particle[][] = new Array(particles_photons.length)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < static_particles_photons.length; i++) {
      let static_array = static_particles_photons[i];
      let movable_array = particles_photons[i];

      movable_array = Electric({
        static_particles: static_array.map((p) =>
          particleToChargedParticle(p, -2)
        ),
        particles: movable_array.map((p) => particleToChargedParticle(p)),
      });

      moved_particles[i] = movable_array;
    }

    particles_photons = moveParticles(moved_particles);
  };

  const processFalling = () => {
    let moved_particles: Particle[][] = new Array(particles_falling.length)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < static_particles_falling.length; i++) {
      let static_array = static_particles_falling[i];
      let movable_array = particles_falling[i];

      movable_array = Repulsion({
        static_particle: particleToChargedParticle(static_array[0], -0.0002),
        particles: movable_array.map((p) => particleToChargedParticle(p)),
      });

      moved_particles[i] = movable_array;
    }

    particles_falling = moveParticles(moved_particles);

    particles_falling.forEach((arr, index) => {
      if (arr[0].y > innerHeight) {
        static_particles_falling = static_particles_falling.filter(
          (_, ind) => ind != index
        );
        particles_falling = particles_falling.filter((_, ind) => ind != index);
      }
    });

    for (let i = 0; i < 50 - static_particles_falling.length; i++) {
      let heart_particle = {
        ...static_particles_heart[
          getRandomInt(static_particles_heart.length - 1)
        ][0],
      };
      heart_particle.y = window.innerWidth;
      static_particles_falling.push([heart_particle]);
    }

    for (let i = 0; i < 50 - particles_falling.length; i++) {
      let heart_particle = {
        ...static_particles_heart[
          getRandomInt(static_particles_heart.length - 1)
        ][0],
      };
      particles_falling.push([heart_particle]);
    }
  };

  const run = () => {
    processHeart();
    processPhotons();
    processFalling();

    endCalculate(
      particlesToArray(particles_heart).concat(
        particlesToArray(particles_falling)
      ),
      particlesToArray(particles_photons, true),
      [],
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
